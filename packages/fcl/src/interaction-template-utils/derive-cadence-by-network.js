import {invariant} from "@onflow/sdk"
import {normalizeInteractionTemplate} from "../normalizers/interaction-template/interaction-template"

/**
 * @description Fills import addresses in Cadence for network
 * 
 * @param {object} params
 * @param {string} params.network - Network to derive Cadence for
 * @param {object} params.template - Interaction Template to derive Cadence from
 * @returns {string} - Cadence
 */
export function deriveCadenceByNetwork({network, template}) {
  invariant(
    network != undefined,
    "deriveCadenceByNetwork({ network }) -- network must be defined"
  )
  invariant(
    typeof network === "string",
    "deriveCadenceByNetwork({ network }) -- network must be a string"
  )

  invariant(
    template != undefined,
    "generateDependencyPin({ template }) -- template must be defined"
  )
  invariant(
    typeof template === "object",
    "generateDependencyPin({ template }) -- template must be an object"
  )
  invariant(
    template.f_type === "InteractionTemplate",
    "generateDependencyPin({ template }) -- template must be an InteractionTemplate"
  )

  template = normalizeInteractionTemplate(template)

  switch (template.f_version) {
    case "1.0.0":
      let networkDependencies = Object.keys(template?.data?.dependencies).map(
        dependencyPlaceholder => {
          let dependencyNetworkContracts = Object.values(
            template?.data?.dependencies?.[dependencyPlaceholder]
          )

          invariant(
            dependencyNetworkContracts,
            `deriveCadenceByNetwork -- Could not find contracts for dependency placeholder: ${dependencyPlaceholder}`
          )

          invariant(
            dependencyNetworkContracts.length === 0,
            `deriveCadenceByNetwork -- Could not find contracts for dependency placeholder: ${dependencyPlaceholder}`
          )

          let dependencyContract = dependencyNetworkContracts[0]
          let dependencyContractForNetwork = dependencyContract?.[network]

          invariant(
            dependencyContractForNetwork,
            `deriveCadenceByNetwork -- Could not find ${network} network information for dependency: ${dependencyPlaceholder}`
          )

          return [dependencyPlaceholder, dependencyContractForNetwork.address]
        }
      )     
      
      return networkDependencies.reduce((cadence, [placeholder, address]) => {
        const regex = new RegExp("(\\b" + placeholder + "\\b)", "g")
        return cadence.replace(regex, address)
      }, template.data.cadence)

    case "1.1.0":
      // get network dependencies from template dependencies, use new string import format
      const networkDeps = {}

      template?.data?.dependencies.forEach(dependency => {
        dependency.contracts.forEach(contract => {
          const contractName = contract.contract
          const networkAddress = null
          contract.networks.forEach(net => {
            if (net.network === network) {
              networkDeps[contractName] = net.address
            }
          })

          invariant(
            networkAddress,
            `networkAddress -- Could not find contracts Network Address: ${contractName}`
          )          
        })
      })

      invariant(
        Object.keys(networkDeps).length === template?.data?.dependencies.length,
        `networkDeps -- Could not find contracts for import dependencies: ${networkDeps}`
      )

      invariant(
        Object.keys(networkDeps).length === Object.values(networkDeps).length,
        `networkDeps -- Could not find all addresses for network ${network} dependencies:  ${networkDeps}`
      )

      console.log("networkDeps", networkDeps)
      return Object.keys(networkDeps).reduce((cadence, contractName) => {
        const test = new RegExp(`\\bimport\\b\\s*\\\"${contractName}\\\"`, "g")
        return cadence.replace(test, `import ${contractName} from ${networkDeps[contractName]}`)
      }, template.data.cadence.body)

    default:
      throw new Error(
        "deriveCadenceByNetwork Error: Unsupported template version"
      )
  }
}
