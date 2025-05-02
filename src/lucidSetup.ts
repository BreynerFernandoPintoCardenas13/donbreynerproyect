import { Lucid, Blockfrost } from "lucid-cardano";

export async function setupLucid(walletApi: any) {
  const lucid = await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodfb2XQr8bfuVu7WQIbgmz8B9p0XMZ7usT"),
    "Preprod"
  );

  lucid.selectWallet(walletApi);

  return lucid;
}
