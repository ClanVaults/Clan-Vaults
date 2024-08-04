const ERC20Balance = () => {
  return (
    <div className="homepage__erc20balance__principalContainer">
      <div className="homepage__erc20balance__subcontainer">
        <svg
          width="37"
          height="37"
          viewBox="0 0 37 37"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18.5" cy="18.5" r="18.5" fill="#D9D9D9" />
        </svg>
        <span className="homepage__erc20balance__generalText">USDC</span>
      </div>
      <div className="homepage__erc20balance__subcontainer">
        <span className="homepage__erc20balance__generalText">$1100</span>
        <span className="homepage__erc20balance__secondaryText">1100</span>
      </div>
    </div>
  );
};

export default ERC20Balance;
