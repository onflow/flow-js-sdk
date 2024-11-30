import {config} from "@onflow/config"
import {invariant} from "@onflow/util-invariant"
import {getServiceRegistry} from "../current-user/exec-service/plugins"

export const makeDiscoveryServices = async () => {
  const extensionServices = window?.fcl_extensions || []
  return [...extensionServices, ...getServiceRegistry().getServices()]
}

export async function getDiscoveryService(service) {
  const discoveryAuthnInclude = await config.get("discovery.authn.include", [])
  const discoveryAuthnExclude = await config.get("discovery.authn.exclude", [])
  const discoveryFeaturesSuggested = await config.get(
    "discovery.features.suggested",
    []
  )
  const discoveryWalletMethod = await config.first([
    "discovery.wallet.method",
    "discovery.wallet.method.default",
  ])
  const method = service?.method ? service.method : discoveryWalletMethod
  const endpoint =
    service?.endpoint ??
    (await config.first(["discovery.wallet", "challenge.handshake"]))

  invariant(
    endpoint,
    `
    If no service is passed to "authenticate," then "discovery.wallet" must be defined in fcl config.
    See: "https://docs.onflow.org/fcl/reference/api/#setting-configuration-values"
    `
  )

  return {
    ...service,
    type: "authn",
    endpoint,
    method,
    discoveryAuthnInclude,
    discoveryAuthnExclude,
    discoveryFeaturesSuggested,
  }
}
