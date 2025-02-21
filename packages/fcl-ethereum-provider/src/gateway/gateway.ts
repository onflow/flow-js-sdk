import HTTPConnection from "@walletconnect/jsonrpc-http-connection"
import {JsonRpcProvider} from "@walletconnect/jsonrpc-provider"
import {FLOW_CHAINS} from "../constants"

export class Gateway {
  private providers: {[chainId: number]: JsonRpcProvider} = {}

  constructor(private rpcUrls: {[chainId: number]: string}) {}

  public async request({
    method,
    params,
    chainId,
  }: {
    method: string
    params: any
    chainId: number
  }): Promise<any> {
    return this.getProvider(chainId).then(provider =>
      provider.request({method, params})
    )
  }

  private async getProvider(eip155ChainId: number): Promise<JsonRpcProvider> {
    if (this.providers[eip155ChainId]) {
      return this.providers[eip155ChainId]
    }

    let rpcUrl: string | undefined = this.rpcUrls[eip155ChainId]
    if (!rpcUrl) {
      for (const chain of Object.values(FLOW_CHAINS)) {
        if (chain.eip155ChainId === eip155ChainId) {
          rpcUrl = chain.publicRpcUrl
          break
        }
      }
    }
    if (!rpcUrl) {
      throw new Error(`RPC URL not found for chainId ${eip155ChainId}`)
    }

    const provider = new JsonRpcProvider(new HTTPConnection(rpcUrl))
    this.providers[eip155ChainId] = provider
    return provider
  }
}
