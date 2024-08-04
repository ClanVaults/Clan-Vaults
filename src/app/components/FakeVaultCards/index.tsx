import { useState, useEffect } from "react";
import VaultCard from "../VaultCard";

function getRandomNumberFormatted() {
  // Number between 0 y 2,000,000
  const randomNumber = Math.floor(Math.random() * 2000000);

  return randomNumber.toLocaleString();
}

function FakeVaultCards() {
  const [vaultCards, setVaultCards] = useState<any[]>([]);

  useEffect(() => {
    const cardsData = [
      { title: "Shadow Legion" },
      { title: "Shadow Legion #2" },
      { title: "Tree Legion" },
      { title: "Empty Legion" },
      { title: "Tomas JRN" },
      { title: "Developer Clan" },
    ].map((card) => ({
      ...card,
      totalAssetsValue: getRandomNumberFormatted(),
      totalAssetsAmount: getRandomNumberFormatted(),
      members: "3",
      rank: "3",
    }));

    setVaultCards(cardsData);
  }, []);

  return (
    <div className="grid-container">
      {vaultCards.map((card) => (
        <VaultCard
          key={card.title}
          title={card.title}
          totalAssetsValue={card.totalAssetsValue}
          totalAssetsAmount={card.totalAssetsAmount}
          members={card.members}
          rank={card.rank}
        />
      ))}
    </div>
  );
}

export default FakeVaultCards;
