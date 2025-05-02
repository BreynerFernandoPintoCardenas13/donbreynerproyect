  // types/cardano.d.ts

  export {};

  declare global {
    interface CardanoWalletAPI {
      enable: () => Promise<CardanoWalletAPI>;
      isEnabled: () => Promise<boolean>;
      getUsedAddresses: () => Promise<string[]>;
      getChangeAddress: () => Promise<string>;
      getNetworkId: () => Promise<number>;
      getBalance: () => Promise<string>;
      // Agrega más métodos según lo necesites
    }

    interface Cardano {
      nami?: CardanoWalletAPI;
      eternl?: CardanoWalletAPI;
      flint?: CardanoWalletAPI;
      lace?: CardanoWalletAPI;
      // Puedes agregar más wallets compatibles con CIP-30
    }

    interface Window {
      cardano?: Cardano;
    }
  }
