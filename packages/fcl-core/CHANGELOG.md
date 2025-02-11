# @onflow/fcl

## 1.13.5

### Patch Changes

- [#2065](https://github.com/onflow/fcl-js/pull/2065) [`3fccbef7bbf985f19d9a9bae2638e538f126f754`](https://github.com/onflow/fcl-js/commit/3fccbef7bbf985f19d9a9bae2638e538f126f754) Thanks [@jribbink](https://github.com/jribbink)! - Fix args type for `fcl.query` & `fcl.mutate`

## 1.13.4

### Patch Changes

- Updated dependencies [[`4e907764cbbe688ea8fd1508968c2b095f00d79e`](https://github.com/onflow/fcl-js/commit/4e907764cbbe688ea8fd1508968c2b095f00d79e)]:
  - @onflow/transport-http@1.10.5
  - @onflow/sdk@1.5.6

## 1.13.3

### Patch Changes

- [#2046](https://github.com/onflow/fcl-js/pull/2046) [`c88f170ab2342f5382dead9a2270e72ce9c6d68a`](https://github.com/onflow/fcl-js/commit/c88f170ab2342f5382dead9a2270e72ce9c6d68a) Thanks [@jribbink](https://github.com/jribbink)! - Fix bug affecting `fcl.tx(...).onceSealed()`

## 1.13.2

### Patch Changes

- [#2043](https://github.com/onflow/fcl-js/pull/2043) [`c0fceb12e3108265e4442ad81817a4cb12f79b0f`](https://github.com/onflow/fcl-js/commit/c0fceb12e3108265e4442ad81817a4cb12f79b0f) Thanks [@jribbink](https://github.com/jribbink)! - Export `TransactionError`

## 1.13.1

### Patch Changes

- [#2039](https://github.com/onflow/fcl-js/pull/2039) [`bc47345ddfc44f0108672f91d8c948eb8e357e3d`](https://github.com/onflow/fcl-js/commit/bc47345ddfc44f0108672f91d8c948eb8e357e3d) Thanks [@jribbink](https://github.com/jribbink)! - Update cross-fetch to v4

- Updated dependencies [[`bc47345ddfc44f0108672f91d8c948eb8e357e3d`](https://github.com/onflow/fcl-js/commit/bc47345ddfc44f0108672f91d8c948eb8e357e3d)]:
  - @onflow/transport-http@1.10.4
  - @onflow/sdk@1.5.5

## 1.13.0

### Minor Changes

- [#2001](https://github.com/onflow/fcl-js/pull/2001) [`bac8c54db1b6821a2158923544aa537885d5a0e7`](https://github.com/onflow/fcl-js/commit/bac8c54db1b6821a2158923544aa537885d5a0e7) Thanks [@jribbink](https://github.com/jribbink)! - Add getStorageProvider to currentUser configuration

- [#1989](https://github.com/onflow/fcl-js/pull/1989) [`8a5f8e9874980c40c1feb3eac915c6e8570abbf3`](https://github.com/onflow/fcl-js/commit/8a5f8e9874980c40c1feb3eac915c6e8570abbf3) Thanks [@jribbink](https://github.com/jribbink)! - Reduce transaction status polling delay to 1000ms

- [#1893](https://github.com/onflow/fcl-js/pull/1893) [`b9f49494d5b3faed1bc24005adc6ba312f653a21`](https://github.com/onflow/fcl-js/commit/b9f49494d5b3faed1bc24005adc6ba312f653a21) Thanks [@jribbink](https://github.com/jribbink)! - Add custom error `TransactionError` type for failing transaction results

### Patch Changes

- [#1970](https://github.com/onflow/fcl-js/pull/1970) [`3b31f1c02b78bf178502627e5ca1de81bdfe8f26`](https://github.com/onflow/fcl-js/commit/3b31f1c02b78bf178502627e5ca1de81bdfe8f26) Thanks [@jribbink](https://github.com/jribbink)! - Pass missing fields to service redirects in execService

- [#1999](https://github.com/onflow/fcl-js/pull/1999) [`c14746a9e4dbde10d6204697a68e6f2de6e83dd1`](https://github.com/onflow/fcl-js/commit/c14746a9e4dbde10d6204697a68e6f2de6e83dd1) Thanks [@jribbink](https://github.com/jribbink)! - Improve deeplinking for WC/RPC wallets using non-WC/RPC pre-authz services

- [#1983](https://github.com/onflow/fcl-js/pull/1983) [`18d24c8bad7efa0d8741d74f0cf299f89b3622c7`](https://github.com/onflow/fcl-js/commit/18d24c8bad7efa0d8741d74f0cf299f89b3622c7) Thanks [@jribbink](https://github.com/jribbink)! - Update dependencies

- Updated dependencies [[`b7860a388960f3d2220c5f85a820a33e41915f35`](https://github.com/onflow/fcl-js/commit/b7860a388960f3d2220c5f85a820a33e41915f35), [`18d24c8bad7efa0d8741d74f0cf299f89b3622c7`](https://github.com/onflow/fcl-js/commit/18d24c8bad7efa0d8741d74f0cf299f89b3622c7)]:
  - @onflow/sdk@1.5.4
  - @onflow/transport-http@1.10.3
  - @onflow/util-invariant@1.2.4
  - @onflow/util-template@1.2.3
  - @onflow/util-address@1.2.3
  - @onflow/util-logger@1.3.3
  - @onflow/util-semver@1.0.3
  - @onflow/util-actor@1.3.4
  - @onflow/util-uid@1.2.3
  - @onflow/config@1.5.1
  - @onflow/types@1.4.1
  - @onflow/rlp@1.2.3

## 1.13.0-alpha.6

### Patch Changes

- Updated dependencies [[`b7860a388960f3d2220c5f85a820a33e41915f35`](https://github.com/onflow/fcl-js/commit/b7860a388960f3d2220c5f85a820a33e41915f35)]:
  - @onflow/sdk@1.5.4-alpha.3

## 1.13.0-alpha.5

### Patch Changes

- [#1970](https://github.com/onflow/fcl-js/pull/1970) [`3b31f1c02b78bf178502627e5ca1de81bdfe8f26`](https://github.com/onflow/fcl-js/commit/3b31f1c02b78bf178502627e5ca1de81bdfe8f26) Thanks [@jribbink](https://github.com/jribbink)! - Pass missing fields to service redirects in execService

- Updated dependencies []:
  - @onflow/sdk@1.5.4-alpha.2

## 1.13.0-alpha.4

### Minor Changes

- [#2001](https://github.com/onflow/fcl-js/pull/2001) [`bac8c54db1b6821a2158923544aa537885d5a0e7`](https://github.com/onflow/fcl-js/commit/bac8c54db1b6821a2158923544aa537885d5a0e7) Thanks [@jribbink](https://github.com/jribbink)! - Add getStorageProvider to currentUser configuration

## 1.13.0-alpha.3

### Patch Changes

- [#1999](https://github.com/onflow/fcl-js/pull/1999) [`c14746a9e4dbde10d6204697a68e6f2de6e83dd1`](https://github.com/onflow/fcl-js/commit/c14746a9e4dbde10d6204697a68e6f2de6e83dd1) Thanks [@jribbink](https://github.com/jribbink)! - Improve deeplinking for WC/RPC wallets using non-WC/RPC pre-authz services

## 1.13.0-alpha.2

### Minor Changes

- [#1989](https://github.com/onflow/fcl-js/pull/1989) [`8a5f8e9874980c40c1feb3eac915c6e8570abbf3`](https://github.com/onflow/fcl-js/commit/8a5f8e9874980c40c1feb3eac915c6e8570abbf3) Thanks [@jribbink](https://github.com/jribbink)! - Reduce transaction status polling delay to 1000ms

## 1.13.0-alpha.1

### Minor Changes

- [#1893](https://github.com/onflow/fcl-js/pull/1893) [`b9f49494d5b3faed1bc24005adc6ba312f653a21`](https://github.com/onflow/fcl-js/commit/b9f49494d5b3faed1bc24005adc6ba312f653a21) Thanks [@jribbink](https://github.com/jribbink)! - Add custom error `TransactionError` type for failing transaction results

### Patch Changes

- Updated dependencies []:
  - @onflow/sdk@1.5.4-alpha.1

## 1.12.1-alpha.0

### Patch Changes

- [#1983](https://github.com/onflow/fcl-js/pull/1983) [`18d24c8bad7efa0d8741d74f0cf299f89b3622c7`](https://github.com/onflow/fcl-js/commit/18d24c8bad7efa0d8741d74f0cf299f89b3622c7) Thanks [@jribbink](https://github.com/jribbink)! - Update dependencies

- Updated dependencies [[`18d24c8bad7efa0d8741d74f0cf299f89b3622c7`](https://github.com/onflow/fcl-js/commit/18d24c8bad7efa0d8741d74f0cf299f89b3622c7)]:
  - @onflow/transport-http@1.10.3-alpha.0
  - @onflow/util-invariant@1.2.4-alpha.0
  - @onflow/util-template@1.2.3-alpha.0
  - @onflow/util-address@1.2.3-alpha.0
  - @onflow/util-logger@1.3.3-alpha.0
  - @onflow/util-semver@1.0.3-alpha.0
  - @onflow/util-actor@1.3.4-alpha.0
  - @onflow/util-uid@1.2.3-alpha.0
  - @onflow/config@1.5.1-alpha.0
  - @onflow/types@1.4.1-alpha.0
  - @onflow/rlp@1.2.3-alpha.0
  - @onflow/sdk@1.5.4-alpha.0

## 1.12.0

### Minor Changes

- [#1966](https://github.com/onflow/fcl-js/pull/1966) [`f2831107`](https://github.com/onflow/fcl-js/commit/f283110707d5edc166bbe05e5482d38fa29de29e) Thanks [@jribbink](https://github.com/jribbink)! - Fix deep linking issues with mobile wallets

## 1.11.1

### Patch Changes

- Updated dependencies []:
  - @onflow/sdk@1.5.3

## 1.11.0

### Minor Changes

- [#1922](https://github.com/onflow/fcl-js/pull/1922) [`266fda58`](https://github.com/onflow/fcl-js/commit/266fda5817900a943925f9a4cbfc69dbcdb98d99) Thanks [@jribbink](https://github.com/jribbink)! - Changes to `execStrategy`:
  - `execStrategy` now exported from `@onflow/fcl-core`
  - Allow overriding `execStrategy` for FCL Discovery when initializing `currentUser`.
  - `execStrategy` now takes additional arguments
    - `customRpc` - a custom RPC client to communicate with the VIEW, if supported
    - `abortSignal` - an AbortSignal to cancel the request (and close any open views)

### Patch Changes

- [#1942](https://github.com/onflow/fcl-js/pull/1942) [`e70a215c`](https://github.com/onflow/fcl-js/commit/e70a215c47d7db6f4e1ddab747be3968abc09c05) Thanks [@jribbink](https://github.com/jribbink)! - Fix `fcl.authenticate` type

- [#1958](https://github.com/onflow/fcl-js/pull/1958) [`e97e8d2f`](https://github.com/onflow/fcl-js/commit/e97e8d2f5197aecf793f26ba82771fd4f7ebc757) Thanks [@jribbink](https://github.com/jribbink)! - Fix window.onload for discovery API

- [#1922](https://github.com/onflow/fcl-js/pull/1922) [`266fda58`](https://github.com/onflow/fcl-js/commit/266fda5817900a943925f9a4cbfc69dbcdb98d99) Thanks [@jribbink](https://github.com/jribbink)! - `postMessage` now strictly communicates with the view which it opened to prevent collisions when FCL opens multiple views in parallel

- [#1949](https://github.com/onflow/fcl-js/pull/1949) [`b8a2a26e`](https://github.com/onflow/fcl-js/commit/b8a2a26e382d543e5058cc1a628b437c3305b13c) Thanks [@jribbink](https://github.com/jribbink)! - Defer `discovery.authn.update` calls to after the window has loaded

- [#1911](https://github.com/onflow/fcl-js/pull/1911) [`6ca1353e`](https://github.com/onflow/fcl-js/commit/6ca1353e2d0c6ad760b7a03da99c8b2b56b48807) Thanks [@jribbink](https://github.com/jribbink)! - Remove unnecessary config.overload call in query/mutate functions (causes unnecessary WalletConnect errors to show in console)

- [#1944](https://github.com/onflow/fcl-js/pull/1944) [`3a89c39c`](https://github.com/onflow/fcl-js/commit/3a89c39ca5033af6b0ff4e606095507753e17de7) Thanks [@jribbink](https://github.com/jribbink)! - Fix `verifyUserSignatures` return type

- Updated dependencies [[`9c787314`](https://github.com/onflow/fcl-js/commit/9c7873140015c9d1e28712aed93c56654f656639), [`bc78da0c`](https://github.com/onflow/fcl-js/commit/bc78da0c283ba0fef2680f040eb69b46e8923fa5), [`cd234798`](https://github.com/onflow/fcl-js/commit/cd234798008868df13447ea97654b7e278dd746f), [`c0b3becf`](https://github.com/onflow/fcl-js/commit/c0b3becfcfb284e2182d6b4b6d809ff67406fc24), [`95c63f26`](https://github.com/onflow/fcl-js/commit/95c63f26c5b21787ba9dddc52c7111183b0983ec)]:
  - @onflow/sdk@1.5.2
  - @onflow/config@1.5.0

## 1.11.0-alpha.4

### Patch Changes

- Updated dependencies [[`cd234798`](https://github.com/onflow/fcl-js/commit/cd234798008868df13447ea97654b7e278dd746f)]:
  - @onflow/config@1.5.0-alpha.0
  - @onflow/sdk@1.5.2-alpha.3

## 1.11.0-alpha.3

### Patch Changes

- [#1949](https://github.com/onflow/fcl-js/pull/1949) [`b8a2a26e`](https://github.com/onflow/fcl-js/commit/b8a2a26e382d543e5058cc1a628b437c3305b13c) Thanks [@jribbink](https://github.com/jribbink)! - Defer `discovery.authn.update` calls to after the window has loaded

## 1.11.0-alpha.2

### Patch Changes

- [#1942](https://github.com/onflow/fcl-js/pull/1942) [`e70a215c`](https://github.com/onflow/fcl-js/commit/e70a215c47d7db6f4e1ddab747be3968abc09c05) Thanks [@jribbink](https://github.com/jribbink)! - Fix `fcl.authenticate` type

- [#1944](https://github.com/onflow/fcl-js/pull/1944) [`3a89c39c`](https://github.com/onflow/fcl-js/commit/3a89c39ca5033af6b0ff4e606095507753e17de7) Thanks [@jribbink](https://github.com/jribbink)! - Fix `verifyUserSignatures` return type

- Updated dependencies [[`95c63f26`](https://github.com/onflow/fcl-js/commit/95c63f26c5b21787ba9dddc52c7111183b0983ec)]:
  - @onflow/sdk@1.5.2-alpha.2

## 1.11.0-alpha.1

### Patch Changes

- Updated dependencies [[`c0b3becf`](https://github.com/onflow/fcl-js/commit/c0b3becfcfb284e2182d6b4b6d809ff67406fc24)]:
  - @onflow/sdk@1.5.2-alpha.1

## 1.11.0-alpha.0

### Minor Changes

- [#1922](https://github.com/onflow/fcl-js/pull/1922) [`266fda58`](https://github.com/onflow/fcl-js/commit/266fda5817900a943925f9a4cbfc69dbcdb98d99) Thanks [@jribbink](https://github.com/jribbink)! - Changes to `execStrategy`:
  - `execStrategy` now exported from `@onflow/fcl-core`
  - Allow overriding `execStrategy` for FCL Discovery when initializing `currentUser`.
  - `execStrategy` now takes additional arguments
    - `customRpc` - a custom RPC client to communicate with the VIEW, if supported
    - `abortSignal` - an AbortSignal to cancel the request (and close any open views)

### Patch Changes

- [#1922](https://github.com/onflow/fcl-js/pull/1922) [`266fda58`](https://github.com/onflow/fcl-js/commit/266fda5817900a943925f9a4cbfc69dbcdb98d99) Thanks [@jribbink](https://github.com/jribbink)! - `postMessage` now strictly communicates with the view which it opened to prevent collisions when FCL opens multiple views in parallel

- [#1911](https://github.com/onflow/fcl-js/pull/1911) [`6ca1353e`](https://github.com/onflow/fcl-js/commit/6ca1353e2d0c6ad760b7a03da99c8b2b56b48807) Thanks [@jribbink](https://github.com/jribbink)! - Remove unnecessary config.overload call in query/mutate functions (causes unnecessary WalletConnect errors to show in console)

- Updated dependencies [[`9c787314`](https://github.com/onflow/fcl-js/commit/9c7873140015c9d1e28712aed93c56654f656639), [`bc78da0c`](https://github.com/onflow/fcl-js/commit/bc78da0c283ba0fef2680f040eb69b46e8923fa5)]:
  - @onflow/sdk@1.5.2-alpha.0

## 1.10.0

### Minor Changes

- [#1888](https://github.com/onflow/fcl-js/pull/1888) [`90aa24d2`](https://github.com/onflow/fcl-js/commit/90aa24d237e0003bd62b53dd26fcf29ab743595b) Thanks [@jribbink](https://github.com/jribbink)! - Warn users to configure FCL-WC Plugin if not already configured. FCL libraries are expected to manage this plugin (i.e. `@onflow/fcl`).

## 1.9.2

### Patch Changes

- [#1894](https://github.com/onflow/fcl-js/pull/1894) [`38607662`](https://github.com/onflow/fcl-js/commit/38607662dbfc54f268c40488e7a6a89bedd169d8) Thanks [@nichita-rusin](https://github.com/nichita-rusin)! - Fix error when calling `fcl.query` with a template object

- Updated dependencies [[`fe5e1b3d`](https://github.com/onflow/fcl-js/commit/fe5e1b3d330b7734740cceb9a873d1b680f28175)]:
  - @onflow/util-actor@1.3.3
  - @onflow/config@1.4.1
  - @onflow/sdk@1.5.1

## 1.9.1

### Patch Changes

- Updated dependencies [[`7ef7edf1`](https://github.com/onflow/fcl-js/commit/7ef7edf1e134041da944f24f49e661caadcc7074), [`6c635f9f`](https://github.com/onflow/fcl-js/commit/6c635f9ff340284845ffe1196965ced7c748294f), [`8fb453b5`](https://github.com/onflow/fcl-js/commit/8fb453b5ff3a00285d91a5432972afbe9e779706), [`ad089fe7`](https://github.com/onflow/fcl-js/commit/ad089fe7556767e1fae96f3f2e98fd76c49bba88)]:
  - @onflow/sdk@1.5.0
  - @onflow/types@1.4.0
  - @onflow/util-invariant@1.2.3
  - @onflow/config@1.4.0

## 1.9.0

### Minor Changes

- [#1614](https://github.com/onflow/fcl-js/pull/1614) [`8ffd3f50`](https://github.com/onflow/fcl-js/commit/8ffd3f5040db314bc1358f05946780af1c03df1a) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Support v1.1.0 of InteractionTemplate and InteractionTemplateInterface

- [#1821](https://github.com/onflow/fcl-js/pull/1821) [`b9c078ce`](https://github.com/onflow/fcl-js/commit/b9c078ce87869c2b41dff07b861cea09a294c6a1) Thanks [@nialexsan](https://github.com/nialexsan)! - Split packages into `@onflow/fcl`, `@onflow/fcl-core`, and `@onflow/fcl-react-native`.

- [#1855](https://github.com/onflow/fcl-js/pull/1855) [`80db8166`](https://github.com/onflow/fcl-js/commit/80db816620d7643c35a0fca7149c15de92f7bc88) Thanks [@jribbink](https://github.com/jribbink)! - Add GetNodeVersionInfo SDK Interaction

- [#1852](https://github.com/onflow/fcl-js/pull/1852) [`b2c73354`](https://github.com/onflow/fcl-js/commit/b2c733545a3904dcff959a2e12b4cf90383bdac0) Thanks [@jribbink](https://github.com/jribbink)! - Add Previewnet FCLCrypto address

### Patch Changes

- [#1827](https://github.com/onflow/fcl-js/pull/1827) [`e74c4a60`](https://github.com/onflow/fcl-js/commit/e74c4a60f38f366874aa1391ca1c890a7ad3a42a) Thanks [@nialexsan](https://github.com/nialexsan)! - pin versions

- [#1832](https://github.com/onflow/fcl-js/pull/1832) [`037dc2f9`](https://github.com/onflow/fcl-js/commit/037dc2f9db9c22185e3c048c65e23e0efa70085f) Thanks [@jribbink](https://github.com/jribbink)! - Update access modifiers to support Cadence 1.0

- Updated dependencies [[`699303cf`](https://github.com/onflow/fcl-js/commit/699303cfd5e0545267632c9236f8c91833ce1259), [`7ed491c5`](https://github.com/onflow/fcl-js/commit/7ed491c5d2335fbbff04444d41f1f1580763d8d3), [`45d3c30c`](https://github.com/onflow/fcl-js/commit/45d3c30c8965512dde41f10d1c64c813811c3c0f), [`acf90a78`](https://github.com/onflow/fcl-js/commit/acf90a7841f843227d5d9edb450ef08322c77c4d), [`b9c078ce`](https://github.com/onflow/fcl-js/commit/b9c078ce87869c2b41dff07b861cea09a294c6a1), [`151a2290`](https://github.com/onflow/fcl-js/commit/151a2290e92fbcb399052476004c7f20ceda5c2d), [`e74c4a60`](https://github.com/onflow/fcl-js/commit/e74c4a60f38f366874aa1391ca1c890a7ad3a42a), [`037dc2f9`](https://github.com/onflow/fcl-js/commit/037dc2f9db9c22185e3c048c65e23e0efa70085f), [`b2c73354`](https://github.com/onflow/fcl-js/commit/b2c733545a3904dcff959a2e12b4cf90383bdac0), [`80db8166`](https://github.com/onflow/fcl-js/commit/80db816620d7643c35a0fca7149c15de92f7bc88), [`0d09d838`](https://github.com/onflow/fcl-js/commit/0d09d8386c2fc472833df7152467d477f36dddc4), [`fdd52c45`](https://github.com/onflow/fcl-js/commit/fdd52c45b3a64210c5f716e13aa4d08d3796370c)]:
  - @onflow/types@1.3.0
  - @onflow/sdk@1.4.0
  - @onflow/util-address@1.2.2
  - @onflow/util-invariant@1.2.2
  - @onflow/util-template@1.2.2
  - @onflow/util-logger@1.3.2
  - @onflow/util-actor@1.3.2
  - @onflow/util-uid@1.2.2
  - @onflow/config@1.3.0
  - @onflow/rlp@1.2.2
  - @onflow/util-semver@1.0.2

## 1.9.0-alpha.8

### Patch Changes

- Updated dependencies [[`7ed491c5`](https://github.com/onflow/fcl-js/commit/7ed491c5d2335fbbff04444d41f1f1580763d8d3)]:
  - @onflow/util-address@1.2.2-alpha.3
  - @onflow/sdk@1.4.0-alpha.9

## 1.9.0-alpha.7

### Minor Changes

- [#1855](https://github.com/onflow/fcl-js/pull/1855) [`80db8166`](https://github.com/onflow/fcl-js/commit/80db816620d7643c35a0fca7149c15de92f7bc88) Thanks [@jribbink](https://github.com/jribbink)! - Add GetNodeVersionInfo SDK Interaction

### Patch Changes

- Updated dependencies [[`80db8166`](https://github.com/onflow/fcl-js/commit/80db816620d7643c35a0fca7149c15de92f7bc88)]:
  - @onflow/sdk@1.4.0-alpha.8

## 1.9.0-alpha.6

### Minor Changes

- [#1852](https://github.com/onflow/fcl-js/pull/1852) [`b2c73354`](https://github.com/onflow/fcl-js/commit/b2c733545a3904dcff959a2e12b4cf90383bdac0) Thanks [@jribbink](https://github.com/jribbink)! - Add Previewnet FCLCrypto address

### Patch Changes

- Updated dependencies [[`b2c73354`](https://github.com/onflow/fcl-js/commit/b2c733545a3904dcff959a2e12b4cf90383bdac0)]:
  - @onflow/sdk@1.4.0-alpha.7

## 1.9.0-alpha.5

### Patch Changes

- Updated dependencies [[`fdd52c45`](https://github.com/onflow/fcl-js/commit/fdd52c45b3a64210c5f716e13aa4d08d3796370c)]:
  - @onflow/config@1.3.0-alpha.3
  - @onflow/sdk@1.4.0-alpha.6

## 1.9.0-alpha.4

### Minor Changes

- [#1614](https://github.com/onflow/fcl-js/pull/1614) [`8ffd3f50`](https://github.com/onflow/fcl-js/commit/8ffd3f5040db314bc1358f05946780af1c03df1a) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Support v1.1.0 of InteractionTemplate and InteractionTemplateInterface

## 1.8.2-alpha.3

### Patch Changes

- Updated dependencies [[`151a2290`](https://github.com/onflow/fcl-js/commit/151a2290e92fbcb399052476004c7f20ceda5c2d)]:
  - @onflow/sdk@1.4.0-alpha.5

## 1.8.2-alpha.2

### Patch Changes

- Updated dependencies [[`45d3c30c`](https://github.com/onflow/fcl-js/commit/45d3c30c8965512dde41f10d1c64c813811c3c0f)]:
  - @onflow/types@1.3.0-alpha.3

## 1.8.2-alpha.1

### Patch Changes

- [#1832](https://github.com/onflow/fcl-js/pull/1832) [`037dc2f9`](https://github.com/onflow/fcl-js/commit/037dc2f9db9c22185e3c048c65e23e0efa70085f) Thanks [@jribbink](https://github.com/jribbink)! - Update access modifiers to support Cadence 1.0

- Updated dependencies [[`037dc2f9`](https://github.com/onflow/fcl-js/commit/037dc2f9db9c22185e3c048c65e23e0efa70085f)]:
  - @onflow/sdk@1.4.0-alpha.4

## 1.8.2-alpha.0

### Patch Changes

- [#1827](https://github.com/onflow/fcl-js/pull/1827) [`e74c4a60`](https://github.com/onflow/fcl-js/commit/e74c4a60f38f366874aa1391ca1c890a7ad3a42a) Thanks [@nialexsan](https://github.com/nialexsan)! - pin versions

- Updated dependencies [[`e74c4a60`](https://github.com/onflow/fcl-js/commit/e74c4a60f38f366874aa1391ca1c890a7ad3a42a)]:
  - @onflow/util-invariant@1.2.2-alpha.2
  - @onflow/util-template@1.2.2-alpha.2
  - @onflow/util-address@1.2.2-alpha.2
  - @onflow/util-logger@1.3.2-alpha.2
  - @onflow/util-semver@1.0.2-alpha.0
  - @onflow/util-actor@1.3.2-alpha.2
  - @onflow/util-uid@1.2.2-alpha.2
  - @onflow/config@1.2.2-alpha.2
  - @onflow/types@1.3.0-alpha.2
  - @onflow/rlp@1.2.2-alpha.2
  - @onflow/sdk@1.4.0-alpha.3

## 1.9.0

### Minor Changes

- [#1811](https://github.com/onflow/fcl-js/pull/1811) [`4554254a`](https://github.com/onflow/fcl-js/commit/4554254a52e6062c04e5842f4ca7701e8b74bc64) Thanks [@bthaile](https://github.com/bthaile)! - Add support for running FLIX v1.1.0 (verified interactions)

### Patch Changes

- [#1792](https://github.com/onflow/fcl-js/pull/1792) [`cb5d38c8`](https://github.com/onflow/fcl-js/commit/cb5d38c8f1a2de47a1932ea8e89e43171b179712) Thanks [@jribbink](https://github.com/jribbink)! - Ignore Not Found errors when polling transaction status (workaround for access node load balancers)

## 1.8.1

### Patch Changes

- [#1807](https://github.com/onflow/fcl-js/pull/1807) [`9430d723`](https://github.com/onflow/fcl-js/commit/9430d7232c272f4acb55f5bcff7be82cef9704d9) Thanks [@jribbink](https://github.com/jribbink)! - Fix versioning & actor bug

- Updated dependencies [[`9430d723`](https://github.com/onflow/fcl-js/commit/9430d7232c272f4acb55f5bcff7be82cef9704d9)]:
  - @onflow/util-actor@1.3.1
  - @onflow/config@1.2.1
  - @onflow/rlp@1.2.1
  - @onflow/sdk@1.3.1
  - @onflow/types@1.2.1
  - @onflow/util-address@1.2.1
  - @onflow/util-invariant@1.2.1
  - @onflow/util-logger@1.3.1
  - @onflow/util-semver@1.0.1
  - @onflow/util-template@1.2.1
  - @onflow/util-uid@1.2.1

## 1.8.0

### Minor Changes

- [#1801](https://github.com/onflow/fcl-js/pull/1801) [`8881394b`](https://github.com/onflow/fcl-js/commit/8881394bc11fea507e330a4c507ef304fe456c42) Thanks [@nialexsan](https://github.com/nialexsan)! - TS build

### Patch Changes

- Updated dependencies [[`8881394b`](https://github.com/onflow/fcl-js/commit/8881394bc11fea507e330a4c507ef304fe456c42), [`8881394b`](https://github.com/onflow/fcl-js/commit/8881394bc11fea507e330a4c507ef304fe456c42), [`8881394b`](https://github.com/onflow/fcl-js/commit/8881394bc11fea507e330a4c507ef304fe456c42), [`8881394b`](https://github.com/onflow/fcl-js/commit/8881394bc11fea507e330a4c507ef304fe456c42), [`8881394b`](https://github.com/onflow/fcl-js/commit/8881394bc11fea507e330a4c507ef304fe456c42)]:
  - @onflow/types@1.2.0
  - @onflow/util-invariant@1.2.0
  - @onflow/util-template@1.2.0
  - @onflow/util-address@1.2.0
  - @onflow/util-logger@1.3.0
  - @onflow/util-uid@1.2.0
  - @onflow/rlp@1.2.0
  - @onflow/util-actor@1.3.0
  - @onflow/config@1.2.0
  - @onflow/sdk@1.3.0

## 1.7.0

### Minor Changes

- [#1775](https://github.com/onflow/fcl-js/pull/1775) [`e0d0d144`](https://github.com/onflow/fcl-js/commit/e0d0d1449524f4c65e3f7a263b5c0a3ab5ac4a89) Thanks [@chasefleming](https://github.com/chasefleming)! - Send suggested features to discovery

### Patch Changes

- [#1785](https://github.com/onflow/fcl-js/pull/1785) [`a3143a80`](https://github.com/onflow/fcl-js/commit/a3143a80d1e5df66c58c837022038d92dd836811) Thanks [@jribbink](https://github.com/jribbink)! - Fix version normalization of services in FCL

- [#1532](https://github.com/onflow/fcl-js/pull/1532) [`06846f8e`](https://github.com/onflow/fcl-js/commit/06846f8e9c1e2cdf10aa8dfdff6e6c5b31af81e5) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Refactor Resolve Accounts to user role based async decomposition for resolving internal accounts

- [#1793](https://github.com/onflow/fcl-js/pull/1793) [`08f4dd6b`](https://github.com/onflow/fcl-js/commit/08f4dd6b0efc2204feb8fae8a480980688a49141) Thanks [@nialexsan](https://github.com/nialexsan)! - Move is-helpers to utils

- [#1532](https://github.com/onflow/fcl-js/pull/1532) [`06846f8e`](https://github.com/onflow/fcl-js/commit/06846f8e9c1e2cdf10aa8dfdff6e6c5b31af81e5) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Fixed duplicate signatures when sending transaction

- Updated dependencies [[`06846f8e`](https://github.com/onflow/fcl-js/commit/06846f8e9c1e2cdf10aa8dfdff6e6c5b31af81e5), [`06846f8e`](https://github.com/onflow/fcl-js/commit/06846f8e9c1e2cdf10aa8dfdff6e6c5b31af81e5)]:
  - @onflow/sdk@1.2.3

## 1.6.0

### Minor Changes

- [#1763](https://github.com/onflow/fcl-js/pull/1763) [`3c99c856`](https://github.com/onflow/fcl-js/commit/3c99c8560f61b5b38238cbd0e93814936aee282e) Thanks [@jribbink](https://github.com/jribbink)! - Add VIEW/DEEPLINK

### Patch Changes

- Updated dependencies [[`5edbd823`](https://github.com/onflow/fcl-js/commit/5edbd823b1a6d25eb7bb52dc55338f95beae73b1)]:
  - @onflow/util-logger@1.2.2
  - @onflow/config@1.1.2

## 1.5.2

### Patch Changes

- [#1767](https://github.com/onflow/fcl-js/pull/1767) [`f6681cfe`](https://github.com/onflow/fcl-js/commit/f6681cfebc5aab78cbf74f34b5655faa4f06a8c4) Thanks [@jribbink](https://github.com/jribbink)! - Fix responseBody not being included in errors

- Updated dependencies [[`f6681cfe`](https://github.com/onflow/fcl-js/commit/f6681cfebc5aab78cbf74f34b5655faa4f06a8c4)]:
  - @onflow/sdk@1.2.2

## 1.5.1

### Patch Changes

- [#1754](https://github.com/onflow/fcl-js/pull/1754) [`c0ba4d26`](https://github.com/onflow/fcl-js/commit/c0ba4d268ce307ddbd83b812db5136f0f29afdc4) Thanks [@jribbink](https://github.com/jribbink)! - Fix `fcl.mutate` typedef

- [#1755](https://github.com/onflow/fcl-js/pull/1755) [`28d16a13`](https://github.com/onflow/fcl-js/commit/28d16a134f9afea265400b49df81f77ac02a520d) Thanks [@jribbink](https://github.com/jribbink)! - Fix react-native platform for `fcl.mutate`

## 1.5.0

### Minor Changes

- [#1666](https://github.com/onflow/fcl-js/pull/1666) [`090963f3`](https://github.com/onflow/fcl-js/commit/090963f3ff6d4557f90a451a1ff5a723656f87dd) Thanks [@nialexsan](https://github.com/nialexsan)! - React Native support

### Patch Changes

- [#1723](https://github.com/onflow/fcl-js/pull/1723) [`1308f522`](https://github.com/onflow/fcl-js/commit/1308f522e56cef517a60be465789815281bab6d8) Thanks [@jribbink](https://github.com/jribbink)! - Fixed types for sdk builder functions (fixes fcl.send/fcl.build type errors)

- [#1707](https://github.com/onflow/fcl-js/pull/1707) [`f7986d9b`](https://github.com/onflow/fcl-js/commit/f7986d9b4e7bba3abc4acbfb036072336d0651cf) Thanks [@nialexsan](https://github.com/nialexsan)! - Deeplink RPC

- [#1690](https://github.com/onflow/fcl-js/pull/1690) [`53d1f607`](https://github.com/onflow/fcl-js/commit/53d1f607fd15535a29cbbb1c809f0fc4d7a6be7b) Thanks [@jribbink](https://github.com/jribbink)! - Stop polling in React Native when browser has been closed

- [#1712](https://github.com/onflow/fcl-js/pull/1712) [`6fa3bdc4`](https://github.com/onflow/fcl-js/commit/6fa3bdc46dd077b57f501d802af5544393502285) Thanks [@jribbink](https://github.com/jribbink)! - Fix getChainId bug with nextjs & no longer set flow.network.default in configuration internally

- [#1699](https://github.com/onflow/fcl-js/pull/1699) [`fefb578a`](https://github.com/onflow/fcl-js/commit/fefb578ae96a112164c561fa3e0a490008d8a5f6) Thanks [@chasefleming](https://github.com/chasefleming)! - Throw error in config if keys detected

- [#1693](https://github.com/onflow/fcl-js/pull/1693) [`51436ccd`](https://github.com/onflow/fcl-js/commit/51436ccd5ceb774b4846c44474914cad2208fe37) Thanks [@jribbink](https://github.com/jribbink)! - Patch URL trailing slash bug in React Native

- Updated dependencies [[`6193bd42`](https://github.com/onflow/fcl-js/commit/6193bd420371494a975f19fd001af6af012bd72f), [`fefb578a`](https://github.com/onflow/fcl-js/commit/fefb578ae96a112164c561fa3e0a490008d8a5f6), [`62fd9baf`](https://github.com/onflow/fcl-js/commit/62fd9baf28afbb2742f9e8c5ef6674adc9d030b7), [`1553967a`](https://github.com/onflow/fcl-js/commit/1553967aff61c242990b2de509e5dc5b8842ab2d)]:
  - @onflow/config@1.1.1
  - @onflow/sdk@1.2.1
  - @onflow/util-logger@1.2.1

## 1.5.0-alpha.5

### Patch Changes

- [#1723](https://github.com/onflow/fcl-js/pull/1723) [`1308f522`](https://github.com/onflow/fcl-js/commit/1308f522e56cef517a60be465789815281bab6d8) Thanks [@jribbink](https://github.com/jribbink)! - Fixed types for sdk builder functions (fixes fcl.send/fcl.build type errors)

- Updated dependencies [[`1553967a`](https://github.com/onflow/fcl-js/commit/1553967aff61c242990b2de509e5dc5b8842ab2d)]:
  - @onflow/sdk@1.2.1-alpha.2

## 1.5.0-alpha.4

### Patch Changes

- [#1707](https://github.com/onflow/fcl-js/pull/1707) [`f7986d9b`](https://github.com/onflow/fcl-js/commit/f7986d9b4e7bba3abc4acbfb036072336d0651cf) Thanks [@nialexsan](https://github.com/nialexsan)! - Deeplink RPC

## 1.5.0-alpha.3

### Patch Changes

- [#1712](https://github.com/onflow/fcl-js/pull/1712) [`6fa3bdc4`](https://github.com/onflow/fcl-js/commit/6fa3bdc46dd077b57f501d802af5544393502285) Thanks [@jribbink](https://github.com/jribbink)! - Fix getChainId bug with nextjs & no longer set flow.network.default in configuration internally

- [#1699](https://github.com/onflow/fcl-js/pull/1699) [`fefb578a`](https://github.com/onflow/fcl-js/commit/fefb578ae96a112164c561fa3e0a490008d8a5f6) Thanks [@chasefleming](https://github.com/chasefleming)! - Throw error in config if keys detected

- Updated dependencies [[`6193bd42`](https://github.com/onflow/fcl-js/commit/6193bd420371494a975f19fd001af6af012bd72f), [`fefb578a`](https://github.com/onflow/fcl-js/commit/fefb578ae96a112164c561fa3e0a490008d8a5f6)]:
  - @onflow/config@1.1.1-alpha.0
  - @onflow/sdk@1.2.1-alpha.0
  - @onflow/util-logger@1.2.1-alpha.0

## 1.5.0-alpha.2

### Patch Changes

- [#1690](https://github.com/onflow/fcl-js/pull/1690) [`53d1f607`](https://github.com/onflow/fcl-js/commit/53d1f607fd15535a29cbbb1c809f0fc4d7a6be7b) Thanks [@jribbink](https://github.com/jribbink)! - Stop polling in React Native when browser has been closed

## 1.5.0-alpha.1

### Patch Changes

- [#1693](https://github.com/onflow/fcl-js/pull/1693) [`51436ccd`](https://github.com/onflow/fcl-js/commit/51436ccd5ceb774b4846c44474914cad2208fe37) Thanks [@jribbink](https://github.com/jribbink)! - Patch URL trailing slash bug in React Native

## 1.5.0-alpha.0

### Minor Changes

- [#1666](https://github.com/onflow/fcl-js/pull/1666) [`090963f3`](https://github.com/onflow/fcl-js/commit/090963f3ff6d4557f90a451a1ff5a723656f87dd) Thanks [@nialexsan](https://github.com/nialexsan)! - React Native support

## 1.4.1

### Patch Changes

- [#1684](https://github.com/onflow/fcl-js/pull/1684) [`86173c99`](https://github.com/onflow/fcl-js/commit/86173c990ffbb34ef6ee25a9a1aae09866cc3f84) Thanks [@chasefleming](https://github.com/chasefleming)! - Add types to t object in query/mutate args fn

## 1.4.0

### Minor Changes

- [#1420](https://github.com/onflow/fcl-js/pull/1420) [`c20bc344`](https://github.com/onflow/fcl-js/commit/c20bc34448a22966d349b0b1c4c0f742ae93a355) Thanks [@huyndo](https://github.com/huyndo)! - Add GetNetworkParameters interaction and a util to get chain ID

- [#1575](https://github.com/onflow/fcl-js/pull/1575) [`bbdeea32`](https://github.com/onflow/fcl-js/commit/bbdeea32f024d6eea4a74c94023e01688a38b6cb) Thanks [@chasefleming](https://github.com/chasefleming)! - Exclude tests from type gen

- [#1639](https://github.com/onflow/fcl-js/pull/1639) [`434c2f48`](https://github.com/onflow/fcl-js/commit/434c2f4887c7d8fd0101ff79cc901d0c66795065) Thanks [@chasefleming](https://github.com/chasefleming)! - Add types for fcl.tx

- [#1591](https://github.com/onflow/fcl-js/pull/1591) [`7b122a49`](https://github.com/onflow/fcl-js/commit/7b122a49b47b2f261e67d4b08d0d8d32d35d3a72) Thanks [@chasefleming](https://github.com/chasefleming)! - Create typedefs package for JSDoc typedefs and TypeScript types

- [#1574](https://github.com/onflow/fcl-js/pull/1574) [`be73c297`](https://github.com/onflow/fcl-js/commit/be73c2975330b3a8a33e8fa3edfdc25a7dc1a2b0) Thanks [@chasefleming](https://github.com/chasefleming)! - Generate types for FCL

### Patch Changes

- [#1663](https://github.com/onflow/fcl-js/pull/1663) [`62dfafa9`](https://github.com/onflow/fcl-js/commit/62dfafa9c7adc3933822b0d3171d6eb025f1719e) Thanks [@nialexsan](https://github.com/nialexsan)! - Upgrade jest to v29.5 and update tests accordingly. Change build to transpile with ESM modules.

- [#1475](https://github.com/onflow/fcl-js/pull/1475) [`6051030f`](https://github.com/onflow/fcl-js/commit/6051030f81fb102447bec40c758657ec20f43129) Thanks [@gregsantos](https://github.com/gregsantos)! - Updates to only call account proof resolver if not logged in. Adds warning if not async resolver function.

- [#1595](https://github.com/onflow/fcl-js/pull/1595) [`a46a6650`](https://github.com/onflow/fcl-js/commit/a46a6650b643e8545a7d58f96a1fe55a3ab0d414) Thanks [@justinbarry](https://github.com/justinbarry)! - Restore missing import statement

- [#1658](https://github.com/onflow/fcl-js/pull/1658) [`2512b5c5`](https://github.com/onflow/fcl-js/commit/2512b5c53dff708fca97cd8afdbb1f4a46b2f106) Thanks [@nialexsan](https://github.com/nialexsan)! - Align jest version

- [#1608](https://github.com/onflow/fcl-js/pull/1608) [`0ec0c5d4`](https://github.com/onflow/fcl-js/commit/0ec0c5d46b780e2b277846f9271ab311aa048b19) Thanks [@nialexsan](https://github.com/nialexsan)! - prep for react-native package

- [#1648](https://github.com/onflow/fcl-js/pull/1648) [`06655aee`](https://github.com/onflow/fcl-js/commit/06655aee2039f3e88741a5ee3b041ecfabb813c9) Thanks [@jribbink](https://github.com/jribbink)! - Fixed `setChainIdDefault()` race condition, instead run function on accessNode.api value changes

- [#1640](https://github.com/onflow/fcl-js/pull/1640) [`b9b957c0`](https://github.com/onflow/fcl-js/commit/b9b957c0fa8829ae0f40d31225a524ddf0d56340) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - PKG -- [fcl] Skip network requests when polling on service if document is not visible

- [#1647](https://github.com/onflow/fcl-js/pull/1647) [`2f10082e`](https://github.com/onflow/fcl-js/commit/2f10082e7bd2d174c1b88c782756097c415289b3) Thanks [@jribbink](https://github.com/jribbink)! - Fix return type for fcl.mutate

- [#1490](https://github.com/onflow/fcl-js/pull/1490) [`b2881f74`](https://github.com/onflow/fcl-js/commit/b2881f74f024aeca52d534d2ca6081fb57efd06d) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Fix invariant type checks in FCL Interaction Template getter utils

- [#1660](https://github.com/onflow/fcl-js/pull/1660) [`9276f6ea`](https://github.com/onflow/fcl-js/commit/9276f6ea37367dfacce19bbffbad6fda56a1a645) Thanks [@nialexsan](https://github.com/nialexsan)! - Switch to cross-fetch

- [#1623](https://github.com/onflow/fcl-js/pull/1623) [`31140ef0`](https://github.com/onflow/fcl-js/commit/31140ef07b9c830759deb5545875dcc89e6f2e81) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - PKG -- [fcl] Retry on network error is page is not visible during backchannel polling

- Updated dependencies [[`e10e3c9c`](https://github.com/onflow/fcl-js/commit/e10e3c9c1f611e7dfd8a0bf7292473c71c2e04b9), [`2d143bc7`](https://github.com/onflow/fcl-js/commit/2d143bc7b30f59e9f9289eee020cfaae74b4f4e1), [`74c75d51`](https://github.com/onflow/fcl-js/commit/74c75d5167560eb07da6e21f9f7835b5639ee7d5), [`62dfafa9`](https://github.com/onflow/fcl-js/commit/62dfafa9c7adc3933822b0d3171d6eb025f1719e), [`66fe102a`](https://github.com/onflow/fcl-js/commit/66fe102a269aca71bd82c6ac55bb23527d04db01), [`62dfafa9`](https://github.com/onflow/fcl-js/commit/62dfafa9c7adc3933822b0d3171d6eb025f1719e), [`c20bc344`](https://github.com/onflow/fcl-js/commit/c20bc34448a22966d349b0b1c4c0f742ae93a355), [`de7ffa47`](https://github.com/onflow/fcl-js/commit/de7ffa4768ea19e9378e7db74c85750b6554027c), [`bbdeea32`](https://github.com/onflow/fcl-js/commit/bbdeea32f024d6eea4a74c94023e01688a38b6cb), [`2512b5c5`](https://github.com/onflow/fcl-js/commit/2512b5c53dff708fca97cd8afdbb1f4a46b2f106), [`544d8ebb`](https://github.com/onflow/fcl-js/commit/544d8ebb298ce1be8491d5609729110211b83242), [`bd6ebb8e`](https://github.com/onflow/fcl-js/commit/bd6ebb8eea5b0de26c0de9b2e0e7561006783040), [`35052784`](https://github.com/onflow/fcl-js/commit/3505278418e64045248c04fd21f0c09ddbb3132e), [`5bec5576`](https://github.com/onflow/fcl-js/commit/5bec5576a79809d0684411736e3f4c02b8051c22), [`48ff4330`](https://github.com/onflow/fcl-js/commit/48ff43303c30bab86274bd281f6af28affdb2f25), [`d9a49531`](https://github.com/onflow/fcl-js/commit/d9a495316cd03ed0de99e0f01d1b8850a1f0eec4), [`7b122a49`](https://github.com/onflow/fcl-js/commit/7b122a49b47b2f261e67d4b08d0d8d32d35d3a72), [`f68c1433`](https://github.com/onflow/fcl-js/commit/f68c14337b5470b4d79ec682f7bb41ddeae2e020), [`687f45ec`](https://github.com/onflow/fcl-js/commit/687f45ec25e613399f031497634c4102935d114d), [`8c921ba2`](https://github.com/onflow/fcl-js/commit/8c921ba2098d2449846bb4a3fdf44a633f4cb11e), [`a4a1c7bf`](https://github.com/onflow/fcl-js/commit/a4a1c7bf0be9facb213f56a91d1a66b60bdea64b)]:
  - @onflow/config@1.1.0
  - @onflow/util-address@1.1.0
  - @onflow/sdk@1.2.0
  - @onflow/rlp@1.1.0
  - @onflow/types@1.1.0
  - @onflow/util-actor@1.2.0
  - @onflow/util-invariant@1.1.0
  - @onflow/util-logger@1.2.0
  - @onflow/util-template@1.1.0
  - @onflow/util-uid@1.1.0

## 1.4.0-alpha.12

### Patch Changes

- [#1660](https://github.com/onflow/fcl-js/pull/1660) [`9276f6ea`](https://github.com/onflow/fcl-js/commit/9276f6ea37367dfacce19bbffbad6fda56a1a645) Thanks [@nialexsan](https://github.com/nialexsan)! - Switch to cross-fetch

## 1.4.0-alpha.11

### Patch Changes

- [#1663](https://github.com/onflow/fcl-js/pull/1663) [`62dfafa9`](https://github.com/onflow/fcl-js/commit/62dfafa9c7adc3933822b0d3171d6eb025f1719e) Thanks [@nialexsan](https://github.com/nialexsan)! - Upgrade jest to v29.5 and update tests accordingly. Change build to transpile with ESM modules.

- Updated dependencies [[`62dfafa9`](https://github.com/onflow/fcl-js/commit/62dfafa9c7adc3933822b0d3171d6eb025f1719e), [`62dfafa9`](https://github.com/onflow/fcl-js/commit/62dfafa9c7adc3933822b0d3171d6eb025f1719e)]:
  - @onflow/sdk@1.2.0-alpha.10
  - @onflow/config@1.1.0-alpha.8
  - @onflow/rlp@1.1.0-alpha.2
  - @onflow/types@1.1.0-alpha.2
  - @onflow/util-actor@1.2.0-alpha.3
  - @onflow/util-address@1.1.0-alpha.5
  - @onflow/util-invariant@1.1.0-alpha.2
  - @onflow/util-logger@1.2.0-alpha.3
  - @onflow/util-template@1.1.0-alpha.2
  - @onflow/util-uid@1.1.0-alpha.3

## 1.4.0-alpha.10

### Patch Changes

- [#1658](https://github.com/onflow/fcl-js/pull/1658) [`2512b5c5`](https://github.com/onflow/fcl-js/commit/2512b5c53dff708fca97cd8afdbb1f4a46b2f106) Thanks [@nialexsan](https://github.com/nialexsan)! - Align jest version

- Updated dependencies [[`2512b5c5`](https://github.com/onflow/fcl-js/commit/2512b5c53dff708fca97cd8afdbb1f4a46b2f106)]:
  - @onflow/util-invariant@1.1.0-alpha.1
  - @onflow/util-template@1.1.0-alpha.1
  - @onflow/util-address@1.1.0-alpha.4
  - @onflow/util-logger@1.2.0-alpha.2
  - @onflow/util-actor@1.2.0-alpha.2
  - @onflow/util-uid@1.1.0-alpha.2
  - @onflow/config@1.1.0-alpha.7
  - @onflow/types@1.1.0-alpha.1
  - @onflow/rlp@1.1.0-alpha.1
  - @onflow/sdk@1.2.0-alpha.9

## 1.4.0-alpha.9

### Minor Changes

- [#1639](https://github.com/onflow/fcl-js/pull/1639) [`434c2f48`](https://github.com/onflow/fcl-js/commit/434c2f4887c7d8fd0101ff79cc901d0c66795065) Thanks [@chasefleming](https://github.com/chasefleming)! - Add types for fcl.tx

### Patch Changes

- [#1648](https://github.com/onflow/fcl-js/pull/1648) [`06655aee`](https://github.com/onflow/fcl-js/commit/06655aee2039f3e88741a5ee3b041ecfabb813c9) Thanks [@jribbink](https://github.com/jribbink)! - Fixed `setChainIdDefault()` race condition, instead run function on accessNode.api value changes

- [#1640](https://github.com/onflow/fcl-js/pull/1640) [`b9b957c0`](https://github.com/onflow/fcl-js/commit/b9b957c0fa8829ae0f40d31225a524ddf0d56340) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - PKG -- [fcl] Skip network requests when polling on service if document is not visible

- [#1647](https://github.com/onflow/fcl-js/pull/1647) [`2f10082e`](https://github.com/onflow/fcl-js/commit/2f10082e7bd2d174c1b88c782756097c415289b3) Thanks [@jribbink](https://github.com/jribbink)! - Fix return type for fcl.mutate

## 1.4.0-alpha.8

### Patch Changes

- [#1623](https://github.com/onflow/fcl-js/pull/1623) [`31140ef0`](https://github.com/onflow/fcl-js/commit/31140ef07b9c830759deb5545875dcc89e6f2e81) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - PKG -- [fcl] Retry on network error is page is not visible during backchannel polling

## 1.4.0-alpha.7

### Patch Changes

- [#1608](https://github.com/onflow/fcl-js/pull/1608) [`0ec0c5d4`](https://github.com/onflow/fcl-js/commit/0ec0c5d46b780e2b277846f9271ab311aa048b19) Thanks [@nialexsan](https://github.com/nialexsan)! - prep for react-native package

## 1.4.0-alpha.6

### Patch Changes

- [#1595](https://github.com/onflow/fcl-js/pull/1595) [`a46a6650`](https://github.com/onflow/fcl-js/commit/a46a6650b643e8545a7d58f96a1fe55a3ab0d414) Thanks [@justinbarry](https://github.com/justinbarry)! - Restore missing import statement

## 1.4.0-alpha.5

### Minor Changes

- [#1591](https://github.com/onflow/fcl-js/pull/1591) [`7b122a49`](https://github.com/onflow/fcl-js/commit/7b122a49b47b2f261e67d4b08d0d8d32d35d3a72) Thanks [@chasefleming](https://github.com/chasefleming)! - Create typedefs package for JSDoc typedefs and TypeScript types

### Patch Changes

- Updated dependencies [[`7b122a49`](https://github.com/onflow/fcl-js/commit/7b122a49b47b2f261e67d4b08d0d8d32d35d3a72)]:
  - @onflow/sdk@1.2.0-alpha.7

## 1.4.0-alpha.4

### Patch Changes

- Updated dependencies [[`d9a49531`](https://github.com/onflow/fcl-js/commit/d9a495316cd03ed0de99e0f01d1b8850a1f0eec4)]:
  - @onflow/config@1.1.0-alpha.4
  - @onflow/rlp@1.1.0-alpha.0
  - @onflow/sdk@1.2.0-alpha.6
  - @onflow/types@1.1.0-alpha.0
  - @onflow/util-actor@1.2.0-alpha.0
  - @onflow/util-address@1.1.0-alpha.3
  - @onflow/util-invariant@1.1.0-alpha.0
  - @onflow/util-logger@1.2.0-alpha.1
  - @onflow/util-template@1.1.0-alpha.0
  - @onflow/util-uid@1.1.0-alpha.1

## 1.4.0-alpha.3

### Minor Changes

- [#1575](https://github.com/onflow/fcl-js/pull/1575) [`bbdeea32`](https://github.com/onflow/fcl-js/commit/bbdeea32f024d6eea4a74c94023e01688a38b6cb) Thanks [@chasefleming](https://github.com/chasefleming)! - Exclude tests from type gen

### Patch Changes

- Updated dependencies [[`bbdeea32`](https://github.com/onflow/fcl-js/commit/bbdeea32f024d6eea4a74c94023e01688a38b6cb)]:
  - @onflow/config@1.1.0-alpha.3
  - @onflow/sdk@1.2.0-alpha.5
  - @onflow/util-address@1.1.0-alpha.2

## 1.4.0-alpha.2

### Minor Changes

- [#1574](https://github.com/onflow/fcl-js/pull/1574) [`be73c297`](https://github.com/onflow/fcl-js/commit/be73c2975330b3a8a33e8fa3edfdc25a7dc1a2b0) Thanks [@chasefleming](https://github.com/chasefleming)! - Generate types for FCL

### Patch Changes

- Updated dependencies [[`74c75d51`](https://github.com/onflow/fcl-js/commit/74c75d5167560eb07da6e21f9f7835b5639ee7d5), [`f68c1433`](https://github.com/onflow/fcl-js/commit/f68c14337b5470b4d79ec682f7bb41ddeae2e020)]:
  - @onflow/sdk@1.2.0-alpha.4
  - @onflow/config@1.1.0-alpha.2

## 1.4.0-alpha.1

### Minor Changes

- [#1420](https://github.com/onflow/fcl-js/pull/1420) [`c20bc344`](https://github.com/onflow/fcl-js/commit/c20bc34448a22966d349b0b1c4c0f742ae93a355) Thanks [@huyndo](https://github.com/huyndo)! - Add GetNetworkParameters interaction and a util to get chain ID

### Patch Changes

- Updated dependencies [[`c20bc344`](https://github.com/onflow/fcl-js/commit/c20bc34448a22966d349b0b1c4c0f742ae93a355), [`5bec5576`](https://github.com/onflow/fcl-js/commit/5bec5576a79809d0684411736e3f4c02b8051c22), [`687f45ec`](https://github.com/onflow/fcl-js/commit/687f45ec25e613399f031497634c4102935d114d)]:
  - @onflow/sdk@1.2.0-alpha.1
  - @onflow/util-address@1.1.0-alpha.0
  - @onflow/util-uid@1.1.0-alpha.0

## 1.3.3-alpha.0

### Patch Changes

- [#1475](https://github.com/onflow/fcl-js/pull/1475) [`6051030f`](https://github.com/onflow/fcl-js/commit/6051030f81fb102447bec40c758657ec20f43129) Thanks [@gregsantos](https://github.com/gregsantos)! - Updates to only call account proof resolver if not logged in. Adds warning if not async resolver function.

- [#1490](https://github.com/onflow/fcl-js/pull/1490) [`b2881f74`](https://github.com/onflow/fcl-js/commit/b2881f74f024aeca52d534d2ca6081fb57efd06d) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Fix invariant type checks in FCL Interaction Template getter utils

- Updated dependencies [[`e10e3c9c`](https://github.com/onflow/fcl-js/commit/e10e3c9c1f611e7dfd8a0bf7292473c71c2e04b9)]:
  - @onflow/config@1.1.0-alpha.0
  - @onflow/sdk@1.1.3-alpha.0
  - @onflow/util-logger@1.1.3-alpha.0

## 1.3.2

### Patch Changes

- [#1368](https://github.com/onflow/fcl-js/pull/1368) [`4bf01436`](https://github.com/onflow/fcl-js/commit/4bf014362fdd043e04a16d7305e8ed78ffd89d6b) Thanks [@sanyu1225](https://github.com/sanyu1225)! - make sure iframe background is translucent

- Updated dependencies [[`f14cfb61`](https://github.com/onflow/fcl-js/commit/f14cfb61abcb877b3c8924508df593c6621413b4), [`7bdfa016`](https://github.com/onflow/fcl-js/commit/7bdfa016823d1caac23143351940b42f65d4d1c4)]:
  - @onflow/types@1.0.5
  - @onflow/config@1.0.5

## 1.3.1

### Patch Changes

- [#1439](https://github.com/onflow/fcl-js/pull/1439) [`a9347ffe`](https://github.com/onflow/fcl-js/commit/a9347ffe4dc1ebafb81999348956a95f56448632) Thanks [@gregsantos](https://github.com/gregsantos)! - Discovery include now sent as part of authn client config

## 1.3.0

### Minor Changes

- [#1352](https://github.com/onflow/fcl-js/pull/1352) [`e33fa8df`](https://github.com/onflow/fcl-js/commit/e33fa8df764ec4f10696eedf520cc92ee402623d) Thanks [@gregsantos](https://github.com/gregsantos)! - Add plugin registry and allow for service and strategy injection

* [#1323](https://github.com/onflow/fcl-js/pull/1323) [`1982c00b`](https://github.com/onflow/fcl-js/commit/1982c00bc334403bb603762a7f921bbe1887ee2b) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Adds FLIP-934 Interaction Template support to FCL.

  Interaction Template is a concept established in FLIP-934. Read more about the FLIP here: https://github.com/onflow/flips/blob/main/flips/20220503-interaction-templates.md

### Patch Changes

- [#1396](https://github.com/onflow/fcl-js/pull/1396) [`8475d5a4`](https://github.com/onflow/fcl-js/commit/8475d5a49e07a678da35a1b8f45751f599256e79) Thanks [@gregsantos](https://github.com/gregsantos)! - ### fcl

  - Added sending `supportedStrategies` to Discovery (UI/API) on client.config

  ***

  ### fcl-wc

  - updated `initFclWC` export/name to `init`
  - Added `sessionRequestHook` and `injectedWallets` opts, updated pairing match to use service.uid.

* [#1375](https://github.com/onflow/fcl-js/pull/1375) [`2a5fa910`](https://github.com/onflow/fcl-js/commit/2a5fa910009501c7c789efc9b1c1731668578361) Thanks [@chasefleming](https://github.com/chasefleming)! - Fix issue where authenticating a Discovery API service would not respect service method.

- [#1359](https://github.com/onflow/fcl-js/pull/1359) [`9ea98850`](https://github.com/onflow/fcl-js/commit/9ea988503bbf4760bdee2a8bd8098be1cd95acb6) Thanks [@jribbink](https://github.com/jribbink)! - Minify UMD build

* [#1386](https://github.com/onflow/fcl-js/pull/1386) [`3fdcc3be`](https://github.com/onflow/fcl-js/commit/3fdcc3be2d206c0df3f3b250012db5c18cac3bed) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Remove support for InteractionTemplateUtils.getInteractionTemplateAudits on mainnet until support is added

- [#1372](https://github.com/onflow/fcl-js/pull/1372) [`6708494d`](https://github.com/onflow/fcl-js/commit/6708494df236dc8c7375a2f91dc04fbcc03235c8) Thanks [@gregsantos](https://github.com/gregsantos)! - Add missing logger package to execService

* [#1409](https://github.com/onflow/fcl-js/pull/1409) [`15d77220`](https://github.com/onflow/fcl-js/commit/15d77220a90be66b440129b73ffe889fe20335ab) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Hotfix to generate template interface id util

- [#1397](https://github.com/onflow/fcl-js/pull/1397) [`f14b730c`](https://github.com/onflow/fcl-js/commit/f14b730c52bec664bda7bf222e3f0c0ab9c70f40) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Adds interaction template message getter utils

* [#1403](https://github.com/onflow/fcl-js/pull/1403) [`0a9c9677`](https://github.com/onflow/fcl-js/commit/0a9c96770933df4e0ed685b0ee4575533e345ecb) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Hotfix to FCL query mutate prep ops

- [#1417](https://github.com/onflow/fcl-js/pull/1417) [`17a7f1e4`](https://github.com/onflow/fcl-js/commit/17a7f1e413340f72f45350075e8ea79ce1c2b711) Thanks [@gregsantos](https://github.com/gregsantos)! - Moves some client configuration to execService as it may be useful for services other than `authn`

* [#1413](https://github.com/onflow/fcl-js/pull/1413) [`5e6d114a`](https://github.com/onflow/fcl-js/commit/5e6d114a8fb0489c6bc70df8ec02d7ec4bb9ea1d) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - PKG -- [fcl] Adds mainnet Interaction Template Audit contract to Interaction Template Utils

- [#1357](https://github.com/onflow/fcl-js/pull/1357) [`ecbd77b2`](https://github.com/onflow/fcl-js/commit/ecbd77b2acfbe4a28793baca3db47c1d5347247d) Thanks [@gregsantos](https://github.com/gregsantos)! - Improve building discovery service on authn

* [#1407](https://github.com/onflow/fcl-js/pull/1407) [`75d06938`](https://github.com/onflow/fcl-js/commit/75d069380c2dbb2040af57ce39a9847fb33a7db4) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Fix circular dep in FCL prep-template-opts

- [#1396](https://github.com/onflow/fcl-js/pull/1396) [`8475d5a4`](https://github.com/onflow/fcl-js/commit/8475d5a49e07a678da35a1b8f45751f599256e79) Thanks [@gregsantos](https://github.com/gregsantos)! - Updates Service Plugin validation to match spec, adds required serviceStrategy: {method: string, exec: () => {})

* [#1404](https://github.com/onflow/fcl-js/pull/1404) [`f9f1dab7`](https://github.com/onflow/fcl-js/commit/f9f1dab70a6014b68ce5197544fae396340b6670) Thanks [@chasefleming](https://github.com/chasefleming)! - Fixes issue where Discovery API was not loading for server side rendered applications on Safari or Chrome Incognito.

* Updated dependencies [[`99e03af7`](https://github.com/onflow/fcl-js/commit/99e03af76e526593e5c989e43754ce23420e317f)]:
  - @onflow/sdk@1.1.2

## 1.3.0-alpha.10

### Patch Changes

- [#1413](https://github.com/onflow/fcl-js/pull/1413) [`5e6d114a`](https://github.com/onflow/fcl-js/commit/5e6d114a8fb0489c6bc70df8ec02d7ec4bb9ea1d) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - PKG -- [fcl] Adds mainnet Interaction Template Audit contract to Interaction Template Utils

## 1.3.0-alpha.9

### Patch Changes

- [#1409](https://github.com/onflow/fcl-js/pull/1409) [`15d77220`](https://github.com/onflow/fcl-js/commit/15d77220a90be66b440129b73ffe889fe20335ab) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Hotfix to generate template interface id util

* [#1407](https://github.com/onflow/fcl-js/pull/1407) [`75d06938`](https://github.com/onflow/fcl-js/commit/75d069380c2dbb2040af57ce39a9847fb33a7db4) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Fix circular dep in FCL prep-template-opts

## 1.3.0-alpha.8

### Patch Changes

- [#1404](https://github.com/onflow/fcl-js/pull/1404) [`f9f1dab7`](https://github.com/onflow/fcl-js/commit/f9f1dab70a6014b68ce5197544fae396340b6670) Thanks [@chasefleming](https://github.com/chasefleming)! - Fixes issue where Discovery API was not loading for server side rendered applications on Safari or Chrome Incognito.

## 1.3.0-alpha.7

### Patch Changes

- [#1397](https://github.com/onflow/fcl-js/pull/1397) [`f14b730c`](https://github.com/onflow/fcl-js/commit/f14b730c52bec664bda7bf222e3f0c0ab9c70f40) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Adds interaction template message getter utils

* [#1403](https://github.com/onflow/fcl-js/pull/1403) [`0a9c9677`](https://github.com/onflow/fcl-js/commit/0a9c96770933df4e0ed685b0ee4575533e345ecb) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Hotfix to FCL query mutate prep ops

## 1.3.0-alpha.6

### Patch Changes

- [#1396](https://github.com/onflow/fcl-js/pull/1396) [`8475d5a4`](https://github.com/onflow/fcl-js/commit/8475d5a49e07a678da35a1b8f45751f599256e79) Thanks [@gregsantos](https://github.com/gregsantos)! - ### fcl

  - Added sending `supportedStrategies` to Discovery (UI/API) on client.config

  ***

  ### fcl-wc

  - updated `initFclWC` export/name to `init`
  - Added `sessionRequestHook` and `injectedWallets` opts, updated pairing match to use service.uid.

* [#1396](https://github.com/onflow/fcl-js/pull/1396) [`8475d5a4`](https://github.com/onflow/fcl-js/commit/8475d5a49e07a678da35a1b8f45751f599256e79) Thanks [@gregsantos](https://github.com/gregsantos)! - Updates Service Plugin validation to match spec, adds required serviceStrategy: {method: string, exec: () => {})

## 1.3.0-alpha.5

### Patch Changes

- [#1386](https://github.com/onflow/fcl-js/pull/1386) [`3fdcc3be`](https://github.com/onflow/fcl-js/commit/3fdcc3be2d206c0df3f3b250012db5c18cac3bed) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Remove support for InteractionTemplateUtils.getInteractionTemplateAudits on mainnet until support is added

## 1.3.0-alpha.4

### Minor Changes

- [#1323](https://github.com/onflow/fcl-js/pull/1323) [`1982c00b`](https://github.com/onflow/fcl-js/commit/1982c00bc334403bb603762a7f921bbe1887ee2b) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - Adds FLIP-934 Interaction Template support to FCL.

  Interaction Template is a concept established in FLIP-934. Read more about the FLIP here: https://github.com/onflow/flips/blob/main/flips/20220503-interaction-templates.md

### Patch Changes

- [#1375](https://github.com/onflow/fcl-js/pull/1375) [`2a5fa910`](https://github.com/onflow/fcl-js/commit/2a5fa910009501c7c789efc9b1c1731668578361) Thanks [@chasefleming](https://github.com/chasefleming)! - Fix issue where authenticating a Discovery API service would not respect service method.

## 1.3.0-alpha.3

### Patch Changes

- [#1372](https://github.com/onflow/fcl-js/pull/1372) [`6708494d`](https://github.com/onflow/fcl-js/commit/6708494df236dc8c7375a2f91dc04fbcc03235c8) Thanks [@gregsantos](https://github.com/gregsantos)! - Add missing logger package to execService

## 1.3.0-alpha.2

### Minor Changes

- [#1352](https://github.com/onflow/fcl-js/pull/1352) [`e33fa8df`](https://github.com/onflow/fcl-js/commit/e33fa8df764ec4f10696eedf520cc92ee402623d) Thanks [@gregsantos](https://github.com/gregsantos)! - Add plugin registry and allow for service and strategy injection

### Patch Changes

- [#1359](https://github.com/onflow/fcl-js/pull/1359) [`9ea98850`](https://github.com/onflow/fcl-js/commit/9ea988503bbf4760bdee2a8bd8098be1cd95acb6) Thanks [@jribbink](https://github.com/jribbink)! - Minify UMD build

## 1.2.1-alpha.1

### Patch Changes

- [#1357](https://github.com/onflow/fcl-js/pull/1357) [`ecbd77b2`](https://github.com/onflow/fcl-js/commit/ecbd77b2acfbe4a28793baca3db47c1d5347247d) Thanks [@gregsantos](https://github.com/gregsantos)! - Improve building discovery service on authn

- Updated dependencies []:
  - @onflow/sdk@1.1.2-alpha.1

## 1.2.1-alpha.0

### Patch Changes

- Updated dependencies [[`99e03af7`](https://github.com/onflow/fcl-js/commit/99e03af76e526593e5c989e43754ce23420e317f)]:
  - @onflow/sdk@1.1.2-alpha.0

## 1.2.0

### Minor Changes

- [#1202](https://github.com/onflow/fcl-js/pull/1202) [`13c1192e`](https://github.com/onflow/fcl-js/commit/13c1192e972c182bbad8fd7f6c68ec08a6920d7a) Thanks [@chasefleming](https://github.com/chasefleming)! - Show uninstalled extensions in Discovery API

### Patch Changes

- [#1337](https://github.com/onflow/fcl-js/pull/1337) [`0c05ae39`](https://github.com/onflow/fcl-js/commit/0c05ae39b2925398029c5b74370fe158b6707d00) Thanks [@gregsantos](https://github.com/gregsantos)! - Adds withPrefix to addresses in verifyAccountProof and verifyUserSignature

## 1.1.1

### Patch Changes

- [#1326](https://github.com/onflow/fcl-js/pull/1326) [`053ff10d`](https://github.com/onflow/fcl-js/commit/053ff10dbc1d6ec64b1cafec9dad6b58ad154552) Thanks [@jribbink](https://github.com/jribbink)! - Fix getAccount executing at latest finalized block instead of sealed block (version bump `@onflow/transport-http`)

* [#1283](https://github.com/onflow/fcl-js/pull/1283) [`b0f7a234`](https://github.com/onflow/fcl-js/commit/b0f7a234a6e71c28e4a02d8edf4927f73e76fa72) Thanks [@gregsantos](https://github.com/gregsantos)! - Updates keyIndices args passed in as Numbers in fcl.verify functions

- [#1274](https://github.com/onflow/fcl-js/pull/1274) [`865e412c`](https://github.com/onflow/fcl-js/commit/865e412c5c975e68f30e9c8b4b225030560a5187) Thanks [@jribbink](https://github.com/jribbink)! - Throw error if FCL popup/tab is blocked from opening or if sendMsgToFCL cannot access parent window reference for postMessage.

* [#1227](https://github.com/onflow/fcl-js/pull/1227) [`352f1460`](https://github.com/onflow/fcl-js/commit/352f1460a2f34d228a74fa4bbc6fcf6e68a968b6) Thanks [@jribbink](https://github.com/jribbink)! - Switch to fcl-bundle instead of microbundle for build scripts

* Updated dependencies [[`053ff10d`](https://github.com/onflow/fcl-js/commit/053ff10dbc1d6ec64b1cafec9dad6b58ad154552), [`352f1460`](https://github.com/onflow/fcl-js/commit/352f1460a2f34d228a74fa4bbc6fcf6e68a968b6)]:
  - @onflow/sdk@1.1.1
  - @onflow/config@1.0.3
  - @onflow/rlp@1.0.2
  - @onflow/types@1.0.3
  - @onflow/util-actor@1.1.1
  - @onflow/util-address@1.0.2
  - @onflow/util-invariant@1.0.2
  - @onflow/util-logger@1.1.1
  - @onflow/util-template@1.0.3
  - @onflow/util-uid@1.0.2

## 1.1.1-alpha.2

### Patch Changes

- Fix getAccount executing at latest finalized block instead of sealed block (version bump `@onflow/transport-http`)

## 1.1.1-alpha.1

### Patch Changes

- [#1283](https://github.com/onflow/fcl-js/pull/1283) [`b0f7a234`](https://github.com/onflow/fcl-js/commit/b0f7a234a6e71c28e4a02d8edf4927f73e76fa72) Thanks [@gregsantos](https://github.com/gregsantos)! - Updates keyIndices args passed in as Numbers in fcl.verify functions

* [#1227](https://github.com/onflow/fcl-js/pull/1227) [`352f1460`](https://github.com/onflow/fcl-js/commit/352f1460a2f34d228a74fa4bbc6fcf6e68a968b6) Thanks [@jribbink](https://github.com/jribbink)! - Switch to fcl-bundle instead of microbundle for build scripts

* Updated dependencies [[`352f1460`](https://github.com/onflow/fcl-js/commit/352f1460a2f34d228a74fa4bbc6fcf6e68a968b6)]:
  - @onflow/config@1.0.3-alpha.0
  - @onflow/rlp@1.0.2-alpha.0
  - @onflow/sdk@1.1.1-alpha.1
  - @onflow/types@1.0.3-alpha.0
  - @onflow/util-actor@1.1.1-alpha.0
  - @onflow/util-address@1.0.2-alpha.0
  - @onflow/util-invariant@1.0.2-alpha.0
  - @onflow/util-logger@1.1.1-alpha.1
  - @onflow/util-template@1.0.3-alpha.0
  - @onflow/util-uid@1.0.2-alpha.0

## 1.1.1-alpha.0

### Patch Changes

- [#1274](https://github.com/onflow/fcl-js/pull/1274) [`865e412c`](https://github.com/onflow/fcl-js/commit/865e412c5c975e68f30e9c8b4b225030560a5187) Thanks [@jribbink](https://github.com/jribbink)! - Throw error if FCL popup/tab is blocked from opening or if sendMsgToFCL cannot access parent window reference for postMessage.

- Updated dependencies []:
  - @onflow/sdk@1.1.1-alpha.0
  - @onflow/util-logger@1.1.1-alpha.0

## 1.1.0

### Minor Changes

- [#1243](https://github.com/onflow/fcl-js/pull/1243) [`4ec2bdc9`](https://github.com/onflow/fcl-js/commit/4ec2bdc9805ac081bdc8003b6e1ea52e02d3909d) Thanks [@jribbink](https://github.com/jribbink)! - Make errors accessible to subscribers from fcl.tx polling (second argument of callback) and throw error for onceSealed, onceExecuted, onceFinalized promises. Also removed retried polling requests as they are a redundancy already implemented by @onflow/transport-http

### Patch Changes

- [#1177](https://github.com/onflow/fcl-js/pull/1177) [`e38f9fe4`](https://github.com/onflow/fcl-js/commit/e38f9fe4ba030693984ab74bffd5bca387ac9a09) Thanks [@hotrungnhan](https://github.com/hotrungnhan)! - Fix events subcribe block height issue and add polling rate guide to docs.

* [#1245](https://github.com/onflow/fcl-js/pull/1245) [`d09ba0f0`](https://github.com/onflow/fcl-js/commit/d09ba0f00f53f93feb351a3da5e821eada6287f0) Thanks [@jribbink](https://github.com/jribbink)! - Switch deprecation warnings to standardized warnings introduced by @onflow/util-logger (log.deprecate)

- [#1211](https://github.com/onflow/fcl-js/pull/1211) [`f4c6fb9a`](https://github.com/onflow/fcl-js/commit/f4c6fb9a05e8cf717afcd6a3b3b4c8b102f253e3) Thanks [@gregsantos](https://github.com/gregsantos)! - Update event listeners in strategies
  Fixes a bug where event listener was not being removed on close

* [#1210](https://github.com/onflow/fcl-js/pull/1210) [`457f4996`](https://github.com/onflow/fcl-js/commit/457f49964dd2a0e849ae18a8dd0864bcb52082e8) Thanks [@jribbink](https://github.com/jribbink)! - Add deprecation warning when "env" is used instead of "flow.network" in config

* Updated dependencies [[`d09ba0f0`](https://github.com/onflow/fcl-js/commit/d09ba0f00f53f93feb351a3da5e821eada6287f0), [`90d5163a`](https://github.com/onflow/fcl-js/commit/90d5163a7723dd529324a271ea8accaa43a3d7be), [`45951f1a`](https://github.com/onflow/fcl-js/commit/45951f1af310d302ee708e43d1a939265f404d2c), [`cc422a78`](https://github.com/onflow/fcl-js/commit/cc422a781d0e87ba8945c336902bbc9542d5b4c4), [`1654ebbe`](https://github.com/onflow/fcl-js/commit/1654ebbe45ea5e4ca13536ed2139520ce21ee314), [`d09ba0f0`](https://github.com/onflow/fcl-js/commit/d09ba0f00f53f93feb351a3da5e821eada6287f0), [`e0d3a377`](https://github.com/onflow/fcl-js/commit/e0d3a377260338a37518f0ad2a52dcc618fd9bc5), [`d1765950`](https://github.com/onflow/fcl-js/commit/d176595021681e660ae0a06161340833280091fb), [`4ec2bdc9`](https://github.com/onflow/fcl-js/commit/4ec2bdc9805ac081bdc8003b6e1ea52e02d3909d)]:
  - @onflow/sdk@1.1.0
  - @onflow/types@1.0.2
  - @onflow/util-logger@1.1.0
  - @onflow/util-template@1.0.2
  - @onflow/util-actor@1.1.0
  - @onflow/config@1.0.2

## 1.1.0-alpha.2

### Minor Changes

- [#1243](https://github.com/onflow/fcl-js/pull/1243) [`4ec2bdc9`](https://github.com/onflow/fcl-js/commit/4ec2bdc9805ac081bdc8003b6e1ea52e02d3909d) Thanks [@jribbink](https://github.com/jribbink)! - Make errors accessible to subscribers from fcl.tx polling (second argument of callback) and throw error for onceSealed, onceExecuted, onceFinalized promises. Also removed retried polling requests as they are a redundancy already implemented by @onflow/transport-http

### Patch Changes

- [#1245](https://github.com/onflow/fcl-js/pull/1245) [`d09ba0f0`](https://github.com/onflow/fcl-js/commit/d09ba0f00f53f93feb351a3da5e821eada6287f0) Thanks [@jribbink](https://github.com/jribbink)! - Switch deprecation warnings to standardized warnings introduced by @onflow/util-logger (log.deprecate)

- Updated dependencies [[`d09ba0f0`](https://github.com/onflow/fcl-js/commit/d09ba0f00f53f93feb351a3da5e821eada6287f0), [`d09ba0f0`](https://github.com/onflow/fcl-js/commit/d09ba0f00f53f93feb351a3da5e821eada6287f0), [`4ec2bdc9`](https://github.com/onflow/fcl-js/commit/4ec2bdc9805ac081bdc8003b6e1ea52e02d3909d)]:
  - @onflow/sdk@1.1.0-alpha.3
  - @onflow/types@1.0.2-alpha.0
  - @onflow/util-logger@1.1.0-alpha.2
  - @onflow/util-template@1.0.2-alpha.0
  - @onflow/util-actor@1.1.0-alpha.0
  - @onflow/config@1.0.2-alpha.0

## 1.0.3-alpha.1

### Patch Changes

- [#1210](https://github.com/onflow/fcl-js/pull/1210) [`457f4996`](https://github.com/onflow/fcl-js/commit/457f49964dd2a0e849ae18a8dd0864bcb52082e8) Thanks [@jribbink](https://github.com/jribbink)! - Add deprecation warning when "env" is used instead of "flow.network" in config

- Updated dependencies [[`e0d3a377`](https://github.com/onflow/fcl-js/commit/e0d3a377260338a37518f0ad2a52dcc618fd9bc5)]:
  - @onflow/sdk@1.1.0-alpha.2

## 1.0.3-alpha.0

### Patch Changes

- [#1177](https://github.com/onflow/fcl-js/pull/1177) [`e38f9fe4`](https://github.com/onflow/fcl-js/commit/e38f9fe4ba030693984ab74bffd5bca387ac9a09) Thanks [@hotrungnhan](https://github.com/hotrungnhan)! - Fix events subcribe block height issue and add polling rate guide to docs.

* [#1211](https://github.com/onflow/fcl-js/pull/1211) [`f4c6fb9a`](https://github.com/onflow/fcl-js/commit/f4c6fb9a05e8cf717afcd6a3b3b4c8b102f253e3) Thanks [@gregsantos](https://github.com/gregsantos)! - Update event listeners in strategies
  Fixes a bug where event listener was not being removed on close
* Updated dependencies [[`1654ebbe`](https://github.com/onflow/fcl-js/commit/1654ebbe45ea5e4ca13536ed2139520ce21ee314), [`d1765950`](https://github.com/onflow/fcl-js/commit/d176595021681e660ae0a06161340833280091fb)]:
  - @onflow/sdk@1.0.2-alpha.0

## 1.0.2

### Patch Changes

- [#1190](https://github.com/onflow/fcl-js/pull/1190) [`3355cb14`](https://github.com/onflow/fcl-js/commit/3355cb148f2e6a447d8076b3ae62c40747c338ce) Thanks [@jribbink](https://github.com/jribbink)! - Updated wallet provider spec for sansPrefix/withPrefix address requirements for acct.address/compSig.address

## 1.0.1

### Patch Changes

- [#1181](https://github.com/onflow/fcl-js/pull/1181) [`25e87101`](https://github.com/onflow/fcl-js/commit/25e8710162a105771d1629eced6270ce37718a1b) Thanks [@jribbink](https://github.com/jribbink)! - Added exception handling in transaction subscriber polling to handle network disconnect/server error events

* [#1178](https://github.com/onflow/fcl-js/pull/1178) [`9e7e4cfb`](https://github.com/onflow/fcl-js/commit/9e7e4cfbc026765019653b0e891e63a2d789ceb4) Thanks [@jribbink](https://github.com/jribbink)! - Add --no-compress to watch scripts for easier debugging

* Updated dependencies [[`9e7e4cfb`](https://github.com/onflow/fcl-js/commit/9e7e4cfbc026765019653b0e891e63a2d789ceb4)]:
  - @onflow/config@1.0.1
  - @onflow/rlp@1.0.1
  - @onflow/sdk@1.0.1
  - @onflow/types@1.0.1
  - @onflow/util-actor@1.0.1
  - @onflow/util-address@1.0.1
  - @onflow/util-invariant@1.0.1
  - @onflow/util-template@1.0.1
  - @onflow/util-uid@1.0.1

## 1.0.0

### Major Changes

- [#1159](https://github.com/onflow/fcl-js/pull/1159) [`28b482fa`](https://github.com/onflow/fcl-js/commit/28b482fa45131faa9d3fad4195a6790b0d301210) Thanks [@gregsantos](https://github.com/gregsantos)! - Updated Account Proof Domain Tag in WalletUtils encode to "FCL-ACCOUNT-PROOF-V0.0", Update encodeAccountProof padStart

* [#1158](https://github.com/onflow/fcl-js/pull/1158) [`f4ae08bb`](https://github.com/onflow/fcl-js/commit/f4ae08bb7e2bdfd1a0364ad1e37b90a489cd104c) Thanks [@gregsantos](https://github.com/gregsantos)! - # Removed default contract address for verifyAccountProof, verifyUserSignatures

  AppUtils.verifyAccountProof and AppUtils.verifyUserSignatures now requires
  setting `fcl.config.flow.network` (testnet or mainnet) or override contract address via
  `opts.fclCryptoContract`

- [#1100](https://github.com/onflow/fcl-js/pull/1100) [`ced27ea8`](https://github.com/onflow/fcl-js/commit/ced27ea855988f02f1312c7b732aa107a410c854) Thanks [@justinbarry](https://github.com/justinbarry)! - Release 1.0.0 alpha

### Minor Changes

- [#1118](https://github.com/onflow/fcl-js/pull/1118) [`21a2dda7`](https://github.com/onflow/fcl-js/commit/21a2dda728aeccee5f3a6c89f8a0c0a9b332e997) Thanks [@gregsantos](https://github.com/gregsantos)! - Import Buffer from rlp in encode-account-proof

### Patch Changes

- [#1143](https://github.com/onflow/fcl-js/pull/1143) [`de47af64`](https://github.com/onflow/fcl-js/commit/de47af647a5bdad154a2d83e2ea2260ab54f0c60) Thanks [@gregsantos](https://github.com/gregsantos)! - Internal update to util-actor

* [#1165](https://github.com/onflow/fcl-js/pull/1165) [`f4ce7b6e`](https://github.com/onflow/fcl-js/commit/f4ce7b6eef551dba1ba6fd94ee18a99176f4a041) Thanks [@gregsantos](https://github.com/gregsantos)! - Remove window.extensions from service msg

- [#1141](https://github.com/onflow/fcl-js/pull/1141) [`ac108e20`](https://github.com/onflow/fcl-js/commit/ac108e2082659cd9f763c42638d2664e593f514c) Thanks [@gregsantos](https://github.com/gregsantos)! - Add support for local FCLCrypto contract account-proof/user-signature verification. fcl.config.network or opts.fclCryptoContract override is now required to use this api.

* [#1164](https://github.com/onflow/fcl-js/pull/1164) [`11229868`](https://github.com/onflow/fcl-js/commit/11229868cf916d204901f8bb3f76ee234e9152a8) Thanks [@justinbarry](https://github.com/justinbarry)! - No longer minify released source code.

- [#1115](https://github.com/onflow/fcl-js/pull/1115) [`f7a985b3`](https://github.com/onflow/fcl-js/commit/f7a985b3cb64ed80c7354f97177ae7ef006530fe) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - **BREAKING** Remove deprecated block builders, interaction types and send methods.

- Updated dependencies [[`700433d5`](https://github.com/onflow/fcl-js/commit/700433d50d4156183b09b13781f7f74f23882586), [`6ff970df`](https://github.com/onflow/fcl-js/commit/6ff970dfc04281c86043e1cf8f5bceb633dc4186), [`7287ff14`](https://github.com/onflow/fcl-js/commit/7287ff14d20e19270ff345cd8b274ad5c8509eb7), [`9c191c15`](https://github.com/onflow/fcl-js/commit/9c191c1520ee772b4343265a42ad0e995a92dd9a), [`de47af64`](https://github.com/onflow/fcl-js/commit/de47af647a5bdad154a2d83e2ea2260ab54f0c60), [`2768d1fa`](https://github.com/onflow/fcl-js/commit/2768d1fac5c74f7fc81cd0810fb7f30b68f8ab6d), [`11229868`](https://github.com/onflow/fcl-js/commit/11229868cf916d204901f8bb3f76ee234e9152a8), [`f7a985b3`](https://github.com/onflow/fcl-js/commit/f7a985b3cb64ed80c7354f97177ae7ef006530fe), [`ced27ea8`](https://github.com/onflow/fcl-js/commit/ced27ea855988f02f1312c7b732aa107a410c854)]:
  - @onflow/sdk@1.0.0
  - @onflow/config@1.0.0
  - @onflow/util-actor@1.0.0
  - @onflow/util-address@1.0.0
  - @onflow/util-invariant@1.0.0
  - @onflow/rlp@1.0.0
  - @onflow/types@1.0.0
  - @onflow/util-template@1.0.0
  - @onflow/util-uid@1.0.0

## 1.0.0-alpha.3

### Major Changes

- [#1159](https://github.com/onflow/fcl-js/pull/1159) [`28b482fa`](https://github.com/onflow/fcl-js/commit/28b482fa45131faa9d3fad4195a6790b0d301210) Thanks [@gregsantos](https://github.com/gregsantos)! - Updated Account Proof Domain Tag in WalletUtils encode to "FCL-ACCOUNT-PROOF-V0.0", Update encodeAccountProof padStart

### Patch Changes

- [#1165](https://github.com/onflow/fcl-js/pull/1165) [`f4ce7b6e`](https://github.com/onflow/fcl-js/commit/f4ce7b6eef551dba1ba6fd94ee18a99176f4a041) Thanks [@gregsantos](https://github.com/gregsantos)! - Remove window.extensions from service msg

* [#1164](https://github.com/onflow/fcl-js/pull/1164) [`11229868`](https://github.com/onflow/fcl-js/commit/11229868cf916d204901f8bb3f76ee234e9152a8) Thanks [@justinbarry](https://github.com/justinbarry)! - No longer minify released source code.

* Updated dependencies [[`11229868`](https://github.com/onflow/fcl-js/commit/11229868cf916d204901f8bb3f76ee234e9152a8)]:
  - @onflow/config@1.0.0-alpha.2
  - @onflow/rlp@1.0.0-alpha.1
  - @onflow/sdk@1.0.0-alpha.2
  - @onflow/types@1.0.0-alpha.1
  - @onflow/util-actor@1.0.0-alpha.2
  - @onflow/util-address@1.0.0-alpha.1
  - @onflow/util-invariant@1.0.0-alpha.1
  - @onflow/util-template@1.0.0-alpha.1
  - @onflow/util-uid@1.0.0-alpha.1

## 1.0.0-alpha.2

### Major Changes

- [#1158](https://github.com/onflow/fcl-js/pull/1158) [`f4ae08bb`](https://github.com/onflow/fcl-js/commit/f4ae08bb7e2bdfd1a0364ad1e37b90a489cd104c) Thanks [@gregsantos](https://github.com/gregsantos)! - # Removed default contract address for verifyAccountProof, verifyUserSignatures

  AppUtils.verifyAccountProof and AppUtils.verifyUserSignatures now requires
  setting `fcl.config.flow.network` (testnet or mainnet) or override contract address via
  `opts.fclCryptoContract`

### Patch Changes

- [#1143](https://github.com/onflow/fcl-js/pull/1143) [`de47af64`](https://github.com/onflow/fcl-js/commit/de47af647a5bdad154a2d83e2ea2260ab54f0c60) Thanks [@gregsantos](https://github.com/gregsantos)! - Internal update to util-actor

* [#1141](https://github.com/onflow/fcl-js/pull/1141) [`ac108e20`](https://github.com/onflow/fcl-js/commit/ac108e2082659cd9f763c42638d2664e593f514c) Thanks [@gregsantos](https://github.com/gregsantos)! - Add support for local FCLCrypto contract account-proof/user-signature verification. fcl.config.network or opts.fclCryptoContract override is now required to use this api.

- [#1115](https://github.com/onflow/fcl-js/pull/1115) [`f7a985b3`](https://github.com/onflow/fcl-js/commit/f7a985b3cb64ed80c7354f97177ae7ef006530fe) Thanks [@JeffreyDoyle](https://github.com/JeffreyDoyle)! - **BREAKING** Remove deprecated block builders, interaction types and send methods.

- Updated dependencies [[`700433d5`](https://github.com/onflow/fcl-js/commit/700433d50d4156183b09b13781f7f74f23882586), [`6ff970df`](https://github.com/onflow/fcl-js/commit/6ff970dfc04281c86043e1cf8f5bceb633dc4186), [`7287ff14`](https://github.com/onflow/fcl-js/commit/7287ff14d20e19270ff345cd8b274ad5c8509eb7), [`9c191c15`](https://github.com/onflow/fcl-js/commit/9c191c1520ee772b4343265a42ad0e995a92dd9a), [`de47af64`](https://github.com/onflow/fcl-js/commit/de47af647a5bdad154a2d83e2ea2260ab54f0c60), [`f7a985b3`](https://github.com/onflow/fcl-js/commit/f7a985b3cb64ed80c7354f97177ae7ef006530fe)]:
  - @onflow/sdk@1.0.0-alpha.1
  - @onflow/config@1.0.0-alpha.1
  - @onflow/util-actor@1.0.0-alpha.1

## 1.0.0-alpha.1

### Minor Changes

- 21a2dda: Import Buffer from rlp in encode-account-proof

### Major Changes

- Release 1.0.0 alpha

### Patch Changes

- Updated dependencies [7469c5c3]
- Updated dependencies

  - @onflow/util-address@1.0.0-alpha.0
  - @onflow/util-invariant@1.0.0-alpha.0
  - @onflow/rlp@1.0.0-alpha.0
  - @onflow/sdk@1.0.0-alpha.0
  - @onflow/types@1.0.0-alpha.0
  - @onflow/util-actor@1.0.0-alpha.0
  - @onflow/util-template@1.0.0-alpha.0
  - @onflow/util-uid@1.0.0-alpha.0

- 2022-03-28 -- [@JeffreyDoyle](https://github.com/JeffreyDoyle) Use latest SDK methods in fcl events subscriber.
- 2022-02-11 -- [@JeffreyDoyle](https://github.com/JeffreyDoyle) Uses Buffer from @onflow/rlp.
- 2022-02-25 -- [gregsantos](https://github.com/gregsantos): Remove `"FCL:LAUNCH:EXTENSION"` type from extension util send
- 2022-02-14 -- [gregsantos](https://github.com/gregsantos): Update `WalletUtils` encoding for authn-signing and auth-verifying.
  Encoding should leave all field that can exist as Buffers before RLP encoding as Buffers. This strategy will help maintain greater consistency with how these fields are treated when encoded in other areas of Flow.

```js
MESSAGE = HEX(
  USER_DOMAIN_TAG, // Buffer, right padded to 32 bytes long
  RLP(
    APP_DOMAIN_TAG, // [Optional] Buffer, right padded to 32 bytes long
    ADDRESS, // Buffer, left padded to 8 bytes long
    TIMESTAMP // Number
  )
)
```

- 2022-02-14 -- [chasefleming](https://github.com/chasefleming): Remove experimental redir warning from previous alpha build.
- 2022-02-08 -- [gregsantos](https://github.com/gregsantos): Update extension strategy to add support for `EXT/RPC` service method

## 0.0.79-alpha.3 - 2022-02-03

- 2022-02-03 -- [gregsantos](https://github.com/gregsantos): VSN `@onflow/sdk` 0.0.57-alpha.2 -> 0.0.57-alpha.3
- 2022-02-03 -- [gregsantos](https://github.com/gregsantos): Export `voucherIntercept` and `voucherToTxId` from `sdk`
- 2022-02-02 -- [gregsantos](https://github.com/gregsantos): Update start script to set current `VERSION`

## 0.0.79-alpha.2 - 2022-01-21

- 2022-01-21 -- [@JeffreyDoyle](https://github.com/JeffreyDoyle): VSN `@onflow/sdk` 0.0.57-alpha.1 -> 0.0.57-alpha.2

## 0.0.79-alpha.1 - 2022-01-21

- 2022-01-21 -- [@JeffreyDoyle](https://github.com/JeffreyDoyle): VSN `@onflow/sdk` 0.0.56 -> 0.0.57-alpha.1

## 0.0.78-alpha.11 - 2022-01-19

- 2022-01-19 -- Expose new `block` method from `@onflow/sdk`.
- 2022-01-19 -- VSN `@onflow/sdk` 0.0.56-alpha.2 -> 0.0.56-alpha.3
- 2022-01-18 -- Support `discovery.wallet.method` options when set in config for authentication with Discovery API services.
- 2022-01-18 -- Add missing `service` and `app` to config for exec service redirect.

## 0.0.78-alpha.10 - 2022-01-05

- 2021-12-17 -- Fix bug where `currentUser` passed as an argument is failing.
- 2021-12-02 -- Adds optional Authentication Refresh Service to `fcl.authenticate`

Wallet Providers can now provide an optional **Authentication Refresh Service** to FCL upon initial configuration.
If provided, FCL will attempt to refresh the user's session by executing this service before a transaction.

FCL will use the service endpoint and method provided to request updated authentication data from the Wallet Provider.
The service is expected to reauthenticate the user or prompt for approval if required. Updated authentication information
(user data and services) should be sent back to FCL as part of an APPROVED `PollingResponse`. (see example below using `WalletUtils.approve`)

If FCL receives back an APPROVED `PollingResponse`, it rebuilds `fcl.currentUser` with updated session data and services
and the Authentication Refresh process is complete.
The initial transaction can then be executed with confidence the user session is valid.

```javascript
import {WalletUtils} from "@onflow/fcl"

WalletUtils.approve({
  f_type: "AuthnResponse",
  f_vsn: "1.0.0"
  services: [                              // All the stuff that configures FCL
  // Authentication Service - REQUIRED
    {
      f_type: "Service",                   // Its a service!
      f_vsn: "1.0.0",                      // Follows the v1.0.0 spec for the service
      type: "authn",                       // the type of service it is
      ...
    },
  // Authentication Refresh Service
  {
    f_type: "Service",                      // Its a service!
    f_vsn: "1.0.0",                         // Follows the v1.0.0 spec for the service
    type: "authn-refresh",                  // The type of service it is
    method: "HTTP/POST",                    // Back Channel
    endpoint: "authentication-refresh-url", // The authentication refresh endpoint
    uid: "awesome-wallet#authn-refresh",    // A unique identifier for the service
    id: "0xUSER",                           // the wallets internal id for the user or flow address
    data: {
      f_type: "authn-refresh",
      f_vsn: "1.0.0",
      address: "0xUSER",                    // The user's address with prefix
    },                                      // will be included in the requests body
    params: { }                             // will be included in the requests url
  },
  /// Additional Services
  ...
  ]
})

```

- 2021-12-07 -- Internal: Updates `fcl.verifyUserSignatures` adding additional validation. Extends Cadence query script to add key weight threshold and enforces signatures need to be from a single account address.

## 0.0.78-alpha.9 - 2021-12-03

- 2021-12-01 -- Internal: Wrap authz in resolve to dedupe accounts. Remove user `notExpired` check.
- 2021-11-30 -- Allow apps to add opt-in wallets in Discovery with config.

```javascript
import {config} from "@onflow/fcl"

// Include supports discovery.wallet or discovery.authn.endpoint
config({
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "discovery.authn.endpoint":
    "https://fcl-discovery.onflow.org/api/testnet/authn",
  "discovery.authn.include": ["0x123"], // Service account address
})
```

- 2021-11-22 -- Updates to use account key `HashAlgorithm` in `verifyUSerSignatures` instead of default `SHA3_256`
- 2021-11-19 -- Update `buildUser` with with correct data prop for `expiresAt`

## 0.0.78-alpha.8 - 2021-11-17

- 2021-11-17 -- VSN `@onflow/types` 0.0.5 -> 0.0.6

## 0.0.78-alpha.7 - 2021-11-12

- 2021-11-10 -- Allow configurable Discovery in FCL via `fcl.discovery` with current support for authn services.

An app developer will now be able to list services for authentication ("authn") in their application and authenticate without having to point directly at a single wallet or `"discovery.wallet"` which is a pre-constructed UI for Flow services.

To use this, first set in the config the API endpoint for fetching Flow services.

```javascript
import {config} from "@onflow/fcl"

config({
  "discovery.authn.endpoint":
    "https://fcl-discovery.onflow.org/api/testnet/authn",
})

// On mainnet, you can use https://fcl-discovery.onflow.org/api/authn
```

Then in an application you can get services with the following:

```javascript
import * as fcl from "@onflow/fcl"

fcl.discovery.authn.subscribe(callback)

// OR

fcl.discovery.authn.snapshot()
```

This will return a list a services which you can then authenticate with the following:

```javascript
fcl.authenticate({service})
```

An example React component could then wind up looking like this:

```javascript
import "./config"
import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

function Component() {
  const [services, setServices] = useState([])
  useEffect(
    () => fcl.discovery.authn.subscribe(res => setServices(res.results)),
    []
  )

  return (
    <div>
      {services.map(service => (
        <button
          key={service.provider.address}
          onClick={() => fcl.authenticate({service})}
        >
          Login with {service.provider.name}
        </button>
      ))}
    </div>
  )
}
```

- 2021-11-10 -- Updates pop/tab to reject on force window close
- 2021-10-29 -- Removes default `config.fcl.appDomainTag` and updates docs.

## 0.0.78-alpha.6 - 2021-10-25

- 2021-10-25 -- Corrects import error in `fcl.events`

## 0.0.78-alpha.5 - 2021-10-21

- 2021-10-21 -- SDK VSN 0.0.55 -> 0.0.56-alpha.1

## 0.0.78-alpha.4 - 2021-10-19

- 2021-10-12 -- Adds `execExtRPC` strategy for use with browser extension communication. Adds new `WalletUtils.ready`, `WalletUtils.redirect` and `WalletUtils.injectExtService` utils. `WalletUtils.ready` takes a callback and optional message data. It tells FCL that the frame/window/tab is ready to receive messages and calls your callback with `FCL:VIEW:READY:RESPONSE` data.

Internal: Extracts message event listener callbacks into `buildMessageHandler` on `extension`, `pop`, `frame`, and `tab`

An extension can be made available in FCL Discovery and displayed as a wallet choice by pushing a `Service` of type `authn` to an array of `fcl_extensions` on the window object or using the `injectExtService` wallet utility.

```javascript
let AuthnService = {
  f_type: "Service",
  f_vsn: "1.0.0",
  type: "authn",
  uid: "awesome-wallet-extension#authn",
  endpoint: "awesome-wallet-extension",
  method: "EXT/RPC",
  id: "0x5678",
  identity: {
    address: "0x1234",
  },
  provider: {
    address: null,
    name: "Awesome Wallet Extension",
    icon: null,
    description: "Awesome Wallet Extension for Chrome",
  },
}

if (!Array.isArray(window.fcl_extensions)) {
  window.fcl_extensions = []
}
window.fcl_extensions.push(AuthnService)
```

```javascript
import {WalletUtils} from "@onflow/fcl"

WalletUtils.injectExtService(AuthnService)
```

- 2021-10-01 -- Simplify passing `currentUser` data into args with the ability to pass `currentUser` as param instead of a creating a user snapshot before.

Examples of `currentUser` as a param.

```javascript
import {query, currentUser} from "@onflow/fcl"

await query({
  cadence: `
    pub fun main(currentUser: Address): Address {
      return currentUser
    }
  `,
  args: (arg, t) => [currentUser],
})
```

## 0.0.78-alpha.3 - 2021-10-01

- 2021-10-01 -- SDK VSN 0.0.55
- 2021-09-29 -- Update `pop` height
- 2021-09-27 -- Add warning for using currentUser server side and turn off local and session storage if server side

## 0.0.78-alpha.2 - 2021-09-23

- 2021-09-22 -- Adds `service` and `config` to `http-post` data
- 2021-09-21 -- Updates `fcl.authenticate` to include msg data `timestamp`, and optional `appDomainTag` for signing (**Proveable Authn**)
- 2021-09-20 -- Adds wallet utilities for encoding provable authentication messages

## 0.0.78-alpha.1 - 2021-09-17

- 2021-09-16 -- Adds redirect option for `POP/RPC` and `TAB/RPC`

## 0.0.77 - 2021-09-17

- 2021-09-16 -- Simplifies current user syntax from `currentUser()` to `currentUser`

Examples of `currentUser` functionality.

```javascript
import {currentUser} from "@onflow/fcl"

currentUser.snapshot()
currentUser.subscribe(callback)
```

- 2021-09-14 -- Adds `WalletUtils.CompositeSignature` constructor.
- 2021-08-27 -- Adds `config.fcl.storage` allowing for injection of desired storage option. Defaults to `SESSION_STORAGE`.

```javascript
export const SESSION_STORAGE = {
  can: true,
  get: async key => JSON.parse(sessionStorage.getItem(key)),
  put: async (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
}
```

## 0.0.77-alpha.4 - 2021-08-27

- 2021-08-27 -- Add `WalletUtils.encodeMessageFromSignable`.
- 2021-08-25 -- Move `verifyUserSignatures` to separate module, removing from `currentUser`
- 2021-08-20 -- Remove default `config`, fix message check in `onMessageFromFCL`
- 2021-08-19 -- Add `WalletUtils.approve`, `WalletUtils.decline`, and `WalletUtils.close`
- 2021-08-12 -- Update `pop`, `tab` onReady response to include deprecated `FCL:FRAME:READY:RESPONSE`.
- 2021-08-10 -- Update `frame` onReady response to include deprecated `FCL:FRAME:READY:RESPONSE`.

## 0.0.77-alpha.3 - 2021-08-04

- 2021-08-04 -- Adds `execTabRPC` strategy.
- 2021-08-02 -- Adds `WalletUtils.onMessageFromFCL`. Update response types to use `VIEW` and add deprecation warnings for `FRAME`.

## 0.0.77-alpha.2 - 2021-07-30

- 2021-07-29 -- Adds `execLocal` to handle rendering of `http-post` service `local-view`.
- 2021-07-26 -- Updates `currentUser.authenticate()` to use execService with parameter destructuring.

## 0.0.77-alpha.1 - 2021-07-23

- 2021-07-23 -- VSN `@onflow/sdk` 0.0.53 -> 0.0.54
- 2021-07-23 -- Reverts to iFrame as default wallet method/view.

## 0.0.77-pain.1

> **PAIN** builds are experimental builds that change a fundamental feature in a not yet backwards compatible way.
> They exist to test and vet ideas and concepts that may make their way into a non-pain build.
> They are called a **PAIN** build because if you are not the intended consumer of the build you will have a really bad time.
> Please use non-pain builds to avoid pain.

- 2021-07-21 -- **EXPERIMENTAL** **Replaces iFrame with pop-up window for authn and authz**. Add `WalletUtils` and use POP/RPC as default.

## 0.0.[75-76] - 2021-07-201

- 2021-07-21 -- SDK VSN 0.0.52
- 2021-07-21 -- Updates `verifyUserSignatures` to use `account` util from `@onflow/sdk`

## 0.0.74 - 2021-07-20

- 2021-07-20 -- SDK VSN 0.0.51

## 0.0.74-alpha.2 - 2021-07-19

- 2021-07-15 -- Update `verifyUserSignature` to pass publicKey signingAlgos into Cadence script. Allows for successfull verification of supported algorithms ECDSA_P256 and ECDSA_secp256k1
- 2021-07-14 -- Updates `fcl.serialize` to use new `config.first`

## 0.0.74-alpha.1 - 2021-07-13

- 2021-07-13 -- VSN `@onflow/sdk` 0.0.50 -> 0.0.51-alpha.1
  - Includes a fix for an issue in what `fcl.serialize` returned.
  - Exposed new `TestUtils` Top Level
  - Includes some new `config` functionality.
    - `config().put("foo", "bar")` -> `config.put("foo", "bar")` config no longer needs to be invoked to access actor methods.
    - `config.overload` allows for injecting configuration data during the execution of the callback.
    - `config.first(["foo", "bar"], "fallback")` will return the first non null config or the fallback.
    - `config.all()` will return the current configuration information.
- 2021-07-08 -- Adds `verifyUserSignatures` util to `currentUser()` and refines use of `composite-signature` normalization
- 2021-06-30 -- Updates `fcl.serialize` to fix setting `resolveFunction`

Examples of `config` functionality.

```javascript
import {config} from "@onflow/fcl"

expect(await config.all()).toEqual({})

config({
  "foo.bar": "baz",
})
config.put("bob", "pat")

expect(await config.all()).toEqual({
  "foo.bar": "baz",
  bob: "pat",
})

var ret = await config.overload({bob: "bill"}, async () => {
  expect(await config.all()).toEqual({
    "foo.bar": "baz",
    bob: "bill",
  })
  return "woot"
})

expect(ret).toBe("woot")

expect(await config.all()).toEqual({
  "foo.bar": "baz",
  bob: "pat",
})

expect(await config.first(["bax", "foo.bar"], "FALLBACK")).toBe("baz")
expect(await config.first(["nope", "oh-no"], "FALLBACK")).toBe("FALLBACK")
```

## 0.0.73 - 2021-06-21

- 2021-06-21 -- Full VSN release of FCL.

## 0.0.73-alpha.3 - 2021-06-18

- 2021-06-18 -- Removed `temp.js`

## 0.0.73-alpha.2 - 2021-06-17

- 2021-06-17 -- VSN `@onflow/sdk` 0.0.48 -> 0.0.50
- 2021-06-17 -- Used `config` from `@onflow/sdk` instead of `@onflow/config`

## 0.0.73-alpha.1 - 2021-06-17

- 2021-06-17 -- **EXPERIMENTAL** Exposes new top level `fcl.mutate` function (@orodio)

New **EXPERIMENTAL** `fcl.mutate` functionality (mirors `fcl.query` but for transactions) can be used like this.

```javascript
// profile contract on testnet
import * as fcl from "@onflow/fcl"

// address overloading works for fcl.mutate too
fcl.config().put("0xProfile", "0xba1132bc08f82fe2")

// defaults to current user for all signatory roles
await fcl.mutate({
  cadence: `
    import Profile from 0xProfile

    transaction(name: String) {
      prepare(acct: AuthAccount) {
        acct
          .borrow<&{Profile.Owner}>(from: Profile.privatePath)
          .setName(name)
      }
    }
  `,

  args: (arg, t) => [arg("qvvg", t.String)],

  limit: 65,
})

// you can use a custom authorization function for all three signatory roles
import {myAuthzFn} from "./my-authz-fn"

const INIT_PROFILE_CONTRACT = `
  import Profile from 0xProfile

  transaction {
    prepare(acct: AuthAccount) {
      if !Profile.check(acct.address) {
        acct.save(<- Profile.new(), to: Profile.privatePath)
        acct.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
      }
    }
  }
`

await fcl.mutate({
  cadence: INIT_PROFILE_CONTRACT,
  authz: myAuthzFn,
})

// individual roles can be overloaded
// mutate will prefer specific roles over authz over current user
// the following is the same as passing myAuthzFn in as authz

await fcl.mutate({
  cadence: INIT_PROFILE_CONTRACT,
  proposer: myAuthzFn,
  payer: myAuthzFn,
  authorizations: [myAuthzFn],
})

// the following would use myAuthzFn to pay for the transaction but the current user for everything else

await fcl.mutate({
  cadence: INIT_PROFILE_CONTRACT,
  payer: myAuthzFn,
})

// the following would use myAuthzFn for the payer and the second authorization but current user for everything else

await fcl.mutate({
  cadence: `
    transaction {
      prepare(currentUser: AuthAccount, myAuthzFn: AuthAccount) {
        // some transaction that requires two authorization accounts
      }
    }
  `,
  payer: myAuthzFn,
  authorizations: [fcl.authz, myAuthzFn],
})

// the following would use myAuthzFn for everything, but the current user will be the authorizer

await fcl.mutate({
  cadence: INIT_PROFILE_CONTRACT,
  authz: myAuthzFn,
  authorizations: [fcl.authz],
})
```

## 0.0.72 - 2021-06-16

- 2021-06-16 -- Full VSN Release `@onflow/fcl` 0.0.71 -> 0.0.72
- 2021-06-16 -- VSN `@onflow/sdk` 0.0.47 -> 0.0.48
- 2021-06-16 -- Exports `encodeMessageFromSignable` from `@onflow/sdk`

## 0.0.71 - 2021-06-04

- 2021-06-04 -- Full VSN Release `@onflow/fcl` 0.0.71-alpha.1 -> 0.0.71

## 0.0.71-alpha.1 - 2021-06-03

- 2021-06-03 -- Adds `hid *` permission policy to iframe rendered in render-frame strategy.
- 2021-05-28 -- Adds `fcl.currentUser().signUserMessage` and `user-signature` service normalizer. `fcl.currentUser().signUserMessage` allows for sending of unencrypted message data to a connected wallet provider or service to be signed with user's private key.
- 2021-05-27 -- Updates `fcl.serialize` to return serialized voucher
- 2021-05-27 -- VSN `@onflow/sdk` 0.0.46-alpha.1 -> 0.0.47-alpha.1

## 0.0.70 - 2021-05-10

- 2021-04-27 -- Full VSN Release `@onflow/fcl` 0.0.70-alpha.1 -> 0.0.70

## 0.0.70-alpha.1 - 2021-05-05

- 2021-05-05 **BREAKING** -- VSN `@onflow/sdk` 0.0.45 -> 0.0.46-alpha.1 -- Prepends a transaction domain tag to encoded payload and envelope messages. Transaction domain tags allow signers to identify which messages are intended to represent encoded transactions, and which are not. The Flow protocol has been updated (as of May 5th 2021) to both accept signatures produced from messages prepended with a transaction domain tag, and from messages that are not. The next spork (time and date of next spork are TBD) will strictly require all signatures for transnactions to have been produced from messages prepended with a transaction domain tag. This breaking change requires all users of Flow Client Library and the Flow JavaScript SDK to update their versions to a version greater than or equal to the verison that this change was included in.

## 0.0.69 - 2021-04-28

- 2021-04-28 -- Exposes `invariant` and `validator` builders from FCL

## 0.0.68 - 2021-04-27

- 2021-04-27 -- Full VSN Release `@onflow/fcl` 0.0.68-alpha.22 -> 0.0.68

## 0.0.68-alpha.22 - 2021-04-26

- 2021-04-26 -- Fixed an issue where `config()` was being called as `fcl.config()`, but `fcl` wasn't available.

## 0.0.68-alpha.21 - 2021-04-21

- 2021-04-21 -- **BREAKING** The experimental feature `fcl.meta` which allowed for a transaction to send along meta data to an authorization function has been removed because of the unprovable nature of its data and our strict trustless requirements. We believe this removal is in the best interest for js-sdk/fcl end users and will be looking into alternative approaches that provide the same functionality but in a more provable/trustless way. We have no ETA on this features replacement.

## 0.0.68-alpha.20 - 2021-04-16

- 2021-04-16 - VSN `@onflow/sdk` 0.0.45-alpha.18 -> 0.0.45-alpha.19

## 0.0.68-alpha.19 - 2021-04-14

- 2021-04-14 - FCL now imports and exports `@onflow/types` as `t` (@orodio)
- 2021-04-14 - **EXPERIMENTAL** Exposes new top level `fcl.query` function. (@orodio)

New **EXPERIMENTAL** `fcl.query` functionality can be used like this.

```javascript
import * as fcl from "@onflow/fcl"

await fcl.query({
  cadence: `
    pub fun main(a: Int, b: Int, addr: Address): Int {
      log(addr)
      return a + b
    }
  `,
  args: (arg, t) => [
    arg(7, t.Int), // a: Int
    arg(6, t.Int), // b: Int
    arg("0xba1132bc08f82fe2", t.Address), // addr: Address
  ],
})
```

## 0.0.68-alpha.18 - 2021-04-09

- 2021-04-09 -- Exposes `meta` and `getCollection` builders from SDK

## 0.0.68-alpha.10 - 2021-03-05

- 2021-03-05 -- Additional Configuration
  - `app.detail.title` -- the title of the application
  - `app.detail.icon` -- url for an icon image for the application
  - `service.OpenID.scopes` -- register interest for scopes to be returned by the wallet

New configuration works like older configuration:

```javascript
import * as fcl from "@onflow/fcl"

fcl
  .config()
  .put("app.detail.title", "My Great Application")
  .put("app.detail.icon", "https://avatars.onflow.org/avatar/dapp")
  .put("service.OpenID.scopes", "email email_verified name")
```

All OpenID data returned should be considered optional. For the time being it will be visable as a service in the current user, but in the future we will provide additional ways to subscribe and access this data.

Info on what could be there is specified in [OpenID Connect Spec](https://openid.net/specs/openid-connect-basic-1_0.html) in particular under [2.4 Scope Values](https://openid.net/specs/openid-connect-basic-1_0.html#Scopes) and [2.5 Standard Claims](https://openid.net/specs/openid-connect-basic-1_0.html#StandardClaims).

Wallets are not expected to implement the open-id service, and if they do we suggest best practice is for wallets to allow the account owner to decide what information is shared (all, none, somewhere in between), for stable applications we also highly recommend you do not depend on a wallet returning this info for a given user.

As always with services, an example of the data they are supposed to return can be found in their normalization file: [normalize/open-id.js](https://github.com/onflow/flow-js-sdk/blob/master/packages/fcl/src/current-user/normalize/open-id.js)

## 0.0.68-alpha.9 - 2021-03-02

- 2020-03-02 -- VSN `@onflow/sdk` 0.0.45-alpha.9 -> 0.0.45-alpha.10

## 0.0.68-alpha.[7..8] - 2021-03-02

- 2021-03-02 -- Authn now uses frame mechanism from Authz flow.
  - This is in prep for sending config details to wallet during handshake.
  - Enables standardized `FCL:FRAME:CLOSE` message for closing frame
  - Introduces a new standardized response `FCL:FRAME:RESPONSE` for wallets to pass the final response back.
  - (EXPERIMENTAL) Introduces a new standardized open response `FCL:FRAME:OPEN` for wallets that need to escape the iframe in web browser
  - This is backwards compatible with older versions of the FCL wallet spec, but will not be included in V1 release.
- 2021-03-02 -- Introduced new config `discovery.wallet`. This will eventually replace `challenge.handshake`.
  - Current implementation will look for `discovery.wallet` first and then fallback onto `challenge.handshake`.
  - This is backwards compatible with older version of FCL, but will not be included in V1 release.

New Wallet AUTHN Flow will now look like this:

```
FCL                         Wallet
 |                            |
 |-------[Render Frame]------>|
 |                            |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[OPTIONAL READY FLOW]
 |<----[FCL:FRAME:READY]------|  // Enables wallet to receive
 |----[APP DETAILS/NEEDS]---->|  // Application specific details/needs
 |     [handles details]------*
 |                            |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[OPTIONAL TAB FLOW] (EXPERIMENTAL)
 |<----[FCL:FRAME:OPEN]-------|  // Some authentication flows cant
 |------[Open Tab]----------->|  // Be handled in an iframe
 |                            |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[GOLDEN AUTH PATH]
 |<----[FCL:FRAME:RESPONSE]---|
 *-------[handles auth]       |
 |-------[Close Frame]---X    |
 |--------[Close Tab]----X    |
 |                            |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[CANCEL AUTH PATH]
 |<----[FCL:FRAME:CLOSE]------|
 |-------[Close Frame]---X    |
 |--------[Close Tab]----X    |
 |                            |
```

`FCL:FRAME:OPEN` payload needs to look like this:

```json
{
  "type": "FCL:FRAME:OPEN",
  "endpoint": "https://google.com"
}
```

> The opened tab (web view in something like Unity/iOS?) will not be responsible for sending the Final `FCL:FRAME:RESPONSE` or `FCL:FRAME:CLOSE` messages (this will need to be the frame), but FCL will attempt to close the tab one authn is complete.

## 0.0.68-alpha.[1..6] - 2021-02-02

- 2021-02-02 -- Adds support for new `GetEvents`, `GetBlockHeader`, `GetBlock`, `GetTransaction` interactions.

## 0.0.67 - 2021-01-14

- 2021-01-14 -- General Cleanup

## 0.0.67-alpha.43 - 2020-12-11

- 2020-12-11 -- Disables setting keyId in fetch signatures

## 0.0.67-alpha.42 - 2020-12-11

- 2020-12-11 -- VSN `@onflow/sdk-send` 0.0.9 -> 0.0.10
- 2020-12-11 -- VSN `@onflow/sdk-resolve` 0.0.9 -> 0.0.10
- 2020-12-11 -- VSN `@onflow/sdk-account` 0.0.7 -> 0.0.8

## 0.0.67-alpha.41 - 2020-12-08

- 2020-12-08 -- FIX: issue with multi-sig from same account (@boczeraturl)

## 0.0.67-alpha.[36..40] - 2020-12-03

- 2020-12-03 -- Updates `@onflow/send` -- This includes some fixes involving how signatures are added to transaction rpc calls
- 2020-12-03 -- FIX: `fcl.serialize` respects injected resolver propoerly.
- 2020-12-03 -- Prep for Resolver extraction.

## 0.0.67-alpha.[19..35] - 2020-11-26

- 2020-11-26 -- `pre-authz` golden path tested on testnet with dapper
- 2020-11-26 -- Early exit `HTTP/POST` so that it can work like an `HTTP/RPC`
- 2020-11-26 -- added an alias from `HTTP/RPC` to `HTTP/POST`
- 2020-11-26 -- additional `pre-authz` debuging in current user
- 2020-11-26 -- service-endpoint includes `l6n` as `window.location.origin`

## 0.0.67-alpha.18 - 2020-11-26

- 2020-11-26 -- `pre-authz` flatmaps exec-services response

## 0.0.67-alpha.17 - 2020-11-23

- 2020-11-23 -- `pre-authz` flow executed
- 2020-11-23 -- `fcl.serialize` now accepts custom resolver

## 0.0.67-alpha.16 - 2020-11-20

- 2020-11-20 -- Rough in pre-authz flow

## 0.0.67-alpha.[7..15] - 2020-11-19

- 2020-11-19 -- Experimental IFRAME/RPC strategy

## 0.0.67-alpha.6 - 2020-11-19

- 2020-11-19 -- IFRAMES can be closed with an `{type: "FCL:FRAME:CLOSE"}` postMessage

## 0.0.67-alpha.5 - 2020-11-19

- 2020-11-19 -- Auto replace known cadence addresses
- 2020-11-17 -- Auto resolve sequence number for proposer if its not there

> Example references this contract: [Testnet Profile Contract](https://flow-view-source.com/testnet/account/0x1d007d755706c469)

```javascript
// Config fcl with contract addresses
// Their config key must start with `0x`
fcl.config()
  .put("flow.network", "testnet")
  .put("0xProfile", "0x1d007d755506c469")

// Your transactions can now look like this
await fcl.send([
  fcl.proposer(fcl.authz),
  fcl.authorizations([fcl.authz])
  fcl.payer(fcl.authz),
  fcl.limit(35),
  fcl.args([
    fcl.arg("Bob", t.String),
  ]),
  fcl.transaction`
    import Profile from 0xProfile

    transaction(displayName: String) {
      prepare(account: AuthAccount) {
        account
          .borrow<&{Profile.Owner}>(from: Profile.privatePath)!
          .setDisplayName(displayName)
      }
    }
  `
])

// Your scripts can now look like this
await fcl.send([
  fcl.args([
    fcl.arg("0xba1132bc08f82fe2", t.Address),
  ]),
  fcl.script`
    import Profile from 0xProfile

    pub fun main(address: Address): Profile.ReadOnly? {
      return Profile.fetchProfile(address)
    }
  `,
]).then(fcl.decode)
```

## 0.0.67-alpha.4 - 2020-11-17

- 2020-11-17 -- Fix small issues involving NPM

## 0.0.67-alpha.3 - 2020-11-17

- 2020-11-17 -- Fix issue where validation for composite signature for keyId of zero was counted as false

## 0.0.67-alpha.2 - 2020-11-17

- 2020-11-17 -- Injected in a custom resolver in prep for pre-authz service

## 0.0.67-alpha.1 - 2020-11-17

- 2020-11-17 -- Added `fcl.account`
- 2020-11-17 -- Added `fcl.reauthenticate`
- 2020-11-17 -- Added `fcl.authz`
- 2020-11-17 -- Added `fcl.signUp`
- 2020-11-17 -- Added `fcl.logIn`

```javascript
// fcl.account - A convenience function for fetching an account
/* old */ await fcl.send([fcl.getAccount("0x1d007d755706c469")])
/* new */ await fcl.account("0x1d007d755706c469")

// fcl.reauthenticate - Logs the current user out before attempting to authenticate again
await fcl.reauthenticate()

// fcl.authz - alias for fcl.currentUser().authorization
await fcl.send([
  fcl.transaction(txCode),
  fcl.proposer(fcl.authz),
  fcl.payer(fcl.authz),
  fcl.authorizations([fcl.authz]),
])

// fcl.signUp and fcl.logIn - Currently these alias fcl.authenticate, eventually they will pass additional context to the wallets
await fcl.signUp()
await fcl.logIn()
```

## 0.0.67-alpha.0 - 2020-11-17

- 2020-11-17 -- VSN @onflow/sdk-latest-block 0.0.2 -> 0.0.3
- 2020-11-17 -- VSN @onflow/sdk-account 0.0.2 -> 0.0.3
- 2020-11-17 -- VSN @onflow/sdk-send 0.0.3 -> 0.0.5

## 0.0.66 - 2020-11-09

- 2020-11-09 -- Adds a handshake mechanism to exec-authz-service to allow clients to request signable message when ready

## 0.0.65 - 2020-11-04

- 2020-11-05 -- sansPrefix required addresses

## 0.0.64 - 2020-11-04

- 2020-11-04 -- VSN `@onflow/sdk-send` 0.0.2 -> 0.0.3

## 0.0.63 - 2020-11-04

- 2020-11-04 -- VSN `@onflow/sdk-resolve` 0.0.3 -> 0.0.4

## 0.0.62 - 2020-10-29

- 2020-10-29 -- Fixed an issue regarding fetching transaction statuses

## 0.0.61 - 2020-10-28

- 2020-10-28 -- VSN `@onflow/sdk-decode` 0.0.0 -> 0.0.1
- 2020-10-28 -- VSN `@onflow/sdk-build-authorizations` 0.0.0 -> 0.0.1
- 2020-10-28 -- VSN `@onflow/sdk-latest-block` 0.0.0 -> 0.0.2
- 2020-10-28 -- VSN `@onflow/sdk-account` 0.0.0 -> 0.0.2
- 2020-10-28 -- VSN `@onflow/sdk-send` 0.0.0 -> 0.0.2
- 2020-10-28 -- VSN `@onflow/sdk-resolve` 0.0.0 -> 0.0.3
- 2020-10-28 -- Added in `persistSession` config flag (defaults to true)

## 0.0.61-alpha.5 - 2020-10-08

- 2020-10-08 -- ADD PROXY `latestBlock` exports directly to `@onflow/sdk-latest-block`
- 2020-10-08 -- ADD PROXY `account` exports directly to `@onflow/sdk-account`
- 2020-10-08 -- PROXY `send` export directly to `@onflow/sdk-send`
- 2020-10-08 -- PROXY `decode` export directly to `@onflow/sdk-decode`
- 2020-10-08 -- VSN `@onflow/decode` 0.0.7 -> 0.0.8
- 2020-10-08 -- VSN `@onflow/sdk-build-get-account` 0.0.0 -> 0.0.1

## 0.0.61-alpha.4 - 2020-10-07

- 2020-10-07 -- remove resolvers and replace with @onflow/sdk-resolve

## 0.0.61-alpha.3 - 2020-10-07

- 2020-10-07 -- remove use of sdk
- 2020-10-07 -- use `@onflow/sdk-resolve-ref-block-id` package directly

## 0.0.61-alpha.2 - 2020-10-07

- 2020-10-07 -- VSN `@onflow/sdk-resolve-signatures` 0.0.0 -> 0.0.1
- 2020-10-07 -- VSN `@onflow/sdk` 0.0.35 -> 0.0.37

## 0.0.61-alpha.1 - 2020-10-07

- 2020-10-07 -- proxy to packages directly instead of via sdk
- 2020-10-07 -- allow for authn iframe to be closed by content

## 0.0.60 -- 2020-10-05

- 2020-10-05 -- iframe feature policy allows usb on all contexts

## 0.0.59 -- 2020-09-29

- 2020-09-29 -- VSN `@onflow/sdk` 0.0.31 -> 0.0.35
- 2020-09-29 -- use `@onflow/sdk-resolve-validators` package directly
- 2020-09-29 -- use `@onflow/sdk-resolve-signatures` package directly
- 2020-09-29 -- use `@onflow/sdk-resolve-accounts` package directly

## 0.0.58 -- 2020-09-29

- 2020-09-29 -- use `@onflow/sdk-resolve-arguments` package directly

## 0.0.57 -- 2020-09-29

- 2020-09-29 -- add a z-index value to service frame
- 2020-09-29 -- resolveParams -> resolveCadence

## 0.0.56 -- 2020-09-04

- 2020-09-04 -- Fixed some issues involving FCL talking to iframes

## 0.0.55 -- 2020-09-04

- 2020-09-04 -- Wallet Provider Services

## 0.0.54 -- 2020-09-03

- 2020-09-03 -- Authn and Authz iframes allow usb feature policy.

## 0.0.53 -- 2020-08-26

- 2020-08-26 -- `@onflow/sdk` VSN `0.0.30` -> `0.0.31`
- 2020-08-20 -- Adds Authorization Function Documentation

## 0.0.52 -- 2020-08-18

- 2020-08-18 -- Authorization persists using local storage (this isnt the final solution, but creates the experience we want for now)
- 2020-08-18 -- authn and authz iframes are now full width and height
- 2020-08-18 -- Fixed an issue where unauthenticating the currentUser wasnt clearning the address on the user
- 2020-08-18 -- Added two new util functions `fcl.withPrefix` and `fcl.sansPrefix`

## 0.0.51 -- 2020-08-14

- 2020-08-14 -- `fcl.tx(resp).once*` throw errors when statusCode is non-zero, errors can be suppressed (previous behaviour) py passing `{suppress: true}` to the `.once*` function.
- 2020-08-14 -- `fcl.tx(resp).subscribe(callback)` callback will only be called when the status is different to what it was before.

## 0.0.50 -- 2020-08-14

- 2020-08-14 -- Fixeds some small bugs due to typos

## 0.0.49 -- 2020-08-13

- 2020-08-13 -- Adds export of `fcl.events(eventKey).subscribe(callback)`

## 0.0.48 -- 2020-08-13

- 2020-08-13 -- Removed `resolveSequenceNumber` from default resolver

## 0.0.47 -- 2020-08-13

- 2020-08-13 -- `@onflow/config` VSN `0.0.1` -> `0.0.2`
- 2020-08-13 -- `@onflow/util-actor` VSN `0.0.1` -> `0.0.2`
- 2020-08-07 -- Adds resolvers `resolveRefBlockId` and `resolveProposerSequenceNumber` to fcl resolve.

## 0.0.46 -- 2020-07-27

- 2020-07-27 -- VSN `@onflow/sdk` 0.0.28 -> 0.0.30

## 0.0.45 -- 2020-07-22

- 2020-07-22 -- deprecate fields on CurrentUser data structure

## 0.0.44 -- 2020-07-22

- 2020-07-22 -- added `tx(r).onceFinalized()` and `tx(r).onceExecuted`.
- 2020-07-22 -- added `tx.isFinalized(txStatus)` and `tx.isExecuted(txStatus)`.

## 0.0.43 -- 2020-07-21

- 2020-07-21 -- VSN `@onflow/sdk` 0.0.27 -> 0.0.28

## 0.0.42 -- 2020-07-20

- 2020-07-20 -- Convert config and actor to use external `@onflow/confg` and `@onflow/util-actor`

## 0.0.41 -- 2020-07-13

- 2020-07-13 -- VSN `@onflow/sdk` 0.0.26 -> 0.0.27

## 0.0.40 -- 2020-07-09

- 2020-07-09 -- Bring in resolveSignatures fix from SDK that passes arguments to the encoder function

## 0.0.39 -- 2020-07-09

- 2020-07-09 -- Expose `fcl.args` and `fcl.arg`
- 2020-07-09 -- Bring in resolveSignatures fix from SDK that deals with signatures better
- 2020-07-08 -- Updates FCL's resolve implementation according to the new resolvers available in the SDK.
- 2020-07-08 -- VSN `@onflow/sdk` 0.0.23 -> 0.0.24

## 0.0.38

- 2020-06-23 -- Added `fcl.serialize`

## 0.0.37 -- 2020-06-04

- 2020-06-04 -- VSN `@onflow/sdk` 0.0.22 -> 0.0.23

## 0.0.36 -- 2020-06-03

- 2020-06-03 -- VSN `@onflow/sdk` 0.0.21 -> 0.0.22

## 0.0.35 -- 2020-05-15

- Rerelease because funky build

## 0.0.34 -- 2020-05-15

- 2020-05-15 -- VSN `@onflow/sdk` 0.0.20 -> 0.0.21

## 0.0.33 -- 2020-05-07

- 2020-05-07 -- VSN `@onflow/sdk` 0.0.19 -> 0.0.20

## 0.0.32 -- 2020-05-07

- 2020-05-07 -- add .npmignore with src/

## 0.0.31 -- 2020-05-07

- 2020-05-07 -- VSN `@onflow/sdk` 0.0.17 -> 0.0.19

## 0.0.30 -- 2020-05-07

- 2020-05-07 -- Created and exposed a top level `tx` function
- 2020-05-07 -- actor spawn now excepts an object of handlers
- 2020-05-07 -- Moved common actor logic into actor (where, all)
- 2020-05-07 -- Exposed fcls actor registry to window

## 0.0.29 -- 2020-05-06

- 2020-05-06 -- Fixed an issue with custom decoders
- 2020-05-06 -- Leverage named imports to enable better tree shaking
- 2020-05-06 -- Proxy `@onflow/sdk` through fcl to enable single import
- 2020-05-06 -- VSN `@onflow/sdk` 0.0.16 -> 0.0.17
- 2020-05-05 -- VSN `@onflow/sdk` 0.0.15 -> 0.0.16
- 2020-05-05 -- Update resolvers based on sdk update
- 2020-05-05 -- VSN `@onflow/sdk` 0.0.14 -> 0.0.15 Breaking Change
- 2020-04-29 -- authn challenge response no longer locks to handshake origin
- 2020-04-28 -- `fcl.user(addr).info()` does a `send([getAccount(addr)])` returning the `account`
- 2020-04-23 -- `fcl.authenticate()` renders iframe for config: `challenge.handshake`

## 0.0.28 -- 2020-04-20

- 2020-04-20 -- VSN `@onflow/sdk` 0.0.12 -> 0.0.14
- 2020-04-20 -- Remove `@onflow/send` in favour of `@onflow/sdk`

## 0.0.27 -- 2020-04-18

- 2020-04-18 -- VSN sdk 0.0.4 -> 0.0.5
- 2020-04-18 -- VSN sdk 0.0.11 -> 0.0.12
- 2020-04-18 -- VSN jest 25.1.0 -> 25.3.0
- 2020-04-18 -- VSN microbundle 0.11.0 -> 0.12.0-next.8

## 0.0.26 -- 2020-04-17

- Pre Changelog
