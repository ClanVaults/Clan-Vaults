import Subtitle from "@/app/home/Subtitle";
import Image from "next/image";

const VaultCard = (props: {
  title: string;
  totalAssetsValue: string;
  totalAssetsAmount: string;
  members: string;
  rank: string;
}) => {
  const { title, totalAssetsAmount, totalAssetsValue, members, rank } = props;

  return (
    <div className="components__vaultCard__principalContainer">
      <div className="components__vaultCard__titleContainer">
        <Image
          src="/empty-profile-icon.svg"
          alt="Vault icon"
          width={49}
          height={49}
        />
        <Subtitle>{title}</Subtitle>
      </div>
      <div className="components__vaultCard__assetsInformationContainer">
        <span className="components__vaultCard__assetInformation">
          Total Assets Value: {totalAssetsValue}
        </span>
        <span className="components__vaultCard__assetInformation">
          Total Assets Amount: {totalAssetsAmount}
        </span>
        <span className="components__vaultCard__assetInformation">
          Current Members: {members}
        </span>
      </div>
      <div className="components__vaultCard__rankContainer">
        <Subtitle>My rank: {rank}</Subtitle>
        <Image
          src="/empty-profile-icon.svg"
          alt="Vault icon"
          width={57}
          height={57}
        />
      </div>
    </div>
  );
};

export default VaultCard;
