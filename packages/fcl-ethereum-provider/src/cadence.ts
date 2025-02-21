import {getContractAddress} from "./util/eth"
import {ContractType} from "./constants"

const evmImport = (chainId: number) =>
  `import EVM from ${getContractAddress(ContractType.EVM, chainId)}`

export const getCOAScript = (chainId: number) => `${evmImport(chainId)}

/// Returns the hex encoded address of the COA in the given Flow address
access(all) fun main(flowAddress: Address): String? {
    return getAuthAccount<auth(BorrowValue) &Account>(flowAddress)
        .storage.borrow<&EVM.CadenceOwnedAccount>(from: /storage/evm)
        ?.address()
        ?.toString()
        ?? nil
}`

export const createCOATx = (chainId: number) => `${evmImport(chainId)}

transaction() {
    prepare(signer: auth(SaveValue, IssueStorageCapabilityController, PublishCapability) &Account) {
        let storagePath = /storage/evm
        let publicPath = /public/evm

        let coa: @EVM.CadenceOwnedAccount <- EVM.createCadenceOwnedAccount()
        signer.storage.save(<-coa, to: storagePath)

        let cap = signer.capabilities.storage.issue<&EVM.CadenceOwnedAccount>(storagePath)
        signer.capabilities.publish(cap, at: publicPath)
    }
}`

export const sendTransactionTx = (chainId: number) => `${evmImport(chainId)}

/// Executes the calldata from the signer's COA
transaction(evmContractAddressHex: String, calldata: String, gasLimit: UInt64, value: UInt) {
    
    let evmAddress: EVM.EVMAddress
    let coa: auth(EVM.Call) &EVM.CadenceOwnedAccount

    prepare(signer: auth(BorrowValue) &Account) {
        self.evmAddress = EVM.addressFromString(evmContractAddressHex)
        self.coa = signer.storage.borrow<auth(EVM.Call) &EVM.CadenceOwnedAccount>(from: /storage/evm)
            ?? panic("Could not borrow COA from provided gateway address")
    }

    execute {
        let valueBalance = EVM.Balance(attoflow: value)
        let callResult = self.coa.call(
            to: self.evmAddress,
            data: calldata.decodeHex(),
            gasLimit: gasLimit,
            value: valueBalance
        )
    }
}`

export const getNonceScript = (chainId: number) => `${evmImport(chainId)}

access(all)
fun main(evmAddress: String): UInt64 {
    let addr = EVM.EVMAddress(bytes: evmAddress.decodeHex().toConstantSized<[UInt8; 20]>()!)
    let nonce = addr.nonce()
    return nonce
}`
