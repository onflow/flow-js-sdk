import {ACCESS_NODE_API_KEY, FLOW_CHAINS, FlowNetwork} from "../constants"
import {
  BehaviorSubject,
  concat,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  from,
  map,
  of,
  switchMap,
} from "../util/observable"
import * as fcl from "@onflow/fcl"
import {AddEthereumChainParams, SwitchEthereumChainParams} from "../types/eth"

export type ChainIdStore = {
  isLoading: boolean
  chainId: number | null
  error: unknown | null
}

export class NetworkManager {
  private $chainIdStore = new BehaviorSubject<ChainIdStore>({
    isLoading: true,
    chainId: null,
    error: null,
  })

  constructor(config: typeof fcl.config) {
    // Map FCL config to behavior subject
    const $config = new BehaviorSubject<Record<string, unknown> | null>(null)
    config.subscribe((cfg, err) => {
      if (err) {
        $config.error(err)
      } else {
        $config.next(cfg)
      }
    })

    // Bind $network to chainId
    $config
      .pipe(
        map(cfg => cfg?.[ACCESS_NODE_API_KEY]),
        distinctUntilChanged(),
        switchMap(accessNode =>
          concat(
            of({isLoading: true} as ChainIdStore),
            from(
              (async () => {
                try {
                  const flowNetwork = (await fcl.getChainId({
                    node: accessNode,
                  })) as FlowNetwork
                  if (!(flowNetwork in FLOW_CHAINS)) {
                    throw new Error("Unknown network")
                  }
                  const {eip155ChainId: chainId} = FLOW_CHAINS[flowNetwork]
                  return {isLoading: false, chainId, error: null}
                } catch (error) {
                  return {isLoading: false, chainId: null, error}
                }
              })()
            )
          )
        )
      )
      .subscribe(this.$chainIdStore)
  }

  get $chainId() {
    return this.$chainIdStore.asObservable()
  }

  public async getChainId(): Promise<number | null> {
    const {chainId, error} = await firstValueFrom(
      this.$chainIdStore.pipe(filter(x => !x.isLoading))
    )

    if (error) {
      throw error
    }
    return chainId
  }

  /**
   * No-op implementation for wallet_addEthereumChain.
   * Since FCL does support dynamic chain additions.
   */
  public async addChain(_chainConfig: AddEthereumChainParams): Promise<null> {
    return null
  }

  public async switchChain(params: SwitchEthereumChainParams): Promise<null> {
    const activeChainId = await this.getChainId()
    if (activeChainId === null) {
      throw new Error("No active chain configured.")
    }

    // Convert the chainId from hex (e.g., "0x64") to a number.
    const requestedChainId = parseInt(params.chainId, 16)

    if (requestedChainId !== activeChainId) {
      throw new Error(
        "Network switch error: The requested chain ID does not match the currently configured network."
      )
    }
    return null
  }
}
