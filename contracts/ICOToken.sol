// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IBEP20 {
  /**
   * @dev Returns the amount of tokens in existence.
   */
  function totalSupply() external view returns (uint256);

  /**
   * @dev Returns the token decimals.
   */
  function decimals() external view returns (uint8);

  /**
   * @dev Returns the token symbol.
   */
  function symbol() external view returns (string memory);

  /**
  * @dev Returns the token name.
  */
  function name() external view returns (string memory);

  /**
   * @dev Returns the bep token owner.
   */
  function getOwner() external view returns (address);

  /**
   * @dev Returns the amount of tokens owned by `account`.
   */
  function balanceOf(address account) external view returns (uint256);

  /**
   * @dev Moves `amount` tokens from the caller's account to `recipient`.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transfer(address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Returns the remaining number of tokens that `spender` will be
   * allowed to spend on behalf of `owner` through {transferFrom}. This is
   * zero by default.
   *
   * This value changes when {approve} or {transferFrom} are called.
   */
  function allowance(address _owner, address spender) external view returns (uint256);

  /**
   * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * IMPORTANT: Beware that changing an allowance with this method brings the risk
   * that someone may use both the old and the new allowance by unfortunate
   * transaction ordering. One possible solution to mitigate this race
   * condition is to first reduce the spender's allowance to 0 and set the
   * desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * Emits an {Approval} event.
   */
  function approve(address spender, uint256 amount) external returns (bool);

  /**
   * @dev Moves `amount` tokens from `sender` to `recipient` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Emitted when `value` tokens are moved from one account (`from`) to
   * another (`to`).
   *
   * Note that `value` may be zero.
   */
  event Transfer(address indexed from, address indexed to, uint256 value);

  /**
   * @dev Emitted when the allowance of a `spender` for an `owner` is set by
   * a call to {approve}. `value` is the new allowance.
   */
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface IETH_USDT {
    function transfer(address recipient, uint256 amount) external;
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address from, address to, uint value) external;
    event Transfer(address indexed from, address indexed to, uint256 value);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8); // This is the function you need

}

interface IERC20 {
    function decimals() external view returns (uint8); // This is the function you need

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    // function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

abstract contract ReentrancyGuard {
    // A boolean flag to track reentrancy
    bool private _notEntered;

    constructor() {
        // Initialize the flag to true
        _notEntered = true;
    }

    modifier nonReentrant() {
        // Require that the function is not already being executed
        require(_notEntered, "ReentrancyGuard: reentry is not allowed");

        // Set the flag to false before the function body
        _notEntered = false;

        // Call the function
        _;

        // Reset the flag after the function finishes
        _notEntered = true;
    }
}



abstract contract TokenPreSaleCommon is Ownable , ReentrancyGuard {
    // Common properties
    IERC20 public token;  // Token being sold
    // uint256 public tokenprice; // Token price (in Wei for ETH, decimals for BSC)
    uint256 public totalsold; // Total tokens sold
    mapping(address => PurchaseInfo) public buyerPurchases; // Track buyers and purchases

    // Common flags and settings
    bool public isAllowClaim = false; // Flag to allow claiming tokens
    bool public defaultAutoClaim = false; // Default auto claim setting

    
    // Keeps track of buyer addresses, purchased token amounts, and claim status
    struct PurchaseInfo {
        uint256 amount;
        bool claimed;
    }

    uint256 public tokenPriceInUsdt;


    event Sell(address sender,uint256 totalvalue); 
    event TokensClaimed(address buyer, uint256 amount);
    event TokenAddressUpdated(IERC20 newToken);



    // constructor 
    constructor(address _tokenaddress, uint256 _tokenPriceInUsdt){
        // tokenprice = _tokenrate;
        token  = IERC20(_tokenaddress);
        tokenPriceInUsdt = _tokenPriceInUsdt;
    }



    // Function to claim purchased presale tokens (after the sale ends)
    function claimTokens(address buyer) public {
        if(!isAllowClaim){
            return;
        }
        uint256 totalPresaleTokens = token.balanceOf(address(this));

        require(buyerPurchases[buyer].amount > totalPresaleTokens, "Insufficient tokens available");
        require(buyerPurchases[buyer].amount > 0, "No tokens purchased");

        // Update claimed property to true
        buyerPurchases[buyer].claimed = true;

        uint256 amountToClaim = buyerPurchases[buyer].amount;
        buyerPurchases[buyer].amount = 0;  // Reset purchase amount after claim

        // Transfer purchased presale tokens to the buyer
        token.transfer(buyer, amountToClaim);

        emit TokensClaimed(buyer, amountToClaim);
    }

    // buyTokens function
    function buyTokens() public payable{
        address buyer = msg.sender;
        uint256 weiAmount = msg.value;
        uint256 buyAmount = _getTokenAmount(weiAmount);
        // Check if buyer already has a purchase entry
        if (buyerPurchases[msg.sender].amount > 0) {
            // Update existing purchase amount
            buyerPurchases[msg.sender].amount += buyAmount;
        } else {
            // Create a new purchase entry for the buyer
            buyerPurchases[msg.sender] = PurchaseInfo(buyAmount, false);
        }
        
        totalsold += buyAmount;
        forwardAllFund();
        // emit sell event for ui
        emit Sell(buyer, buyAmount);

        // Optionally perform immediate claim if defaultAutoClaim is true
        if (defaultAutoClaim) {
            claimTokens(msg.sender);
        }
    }

    function buyTokensWithUSDT(uint256 _usdtAmountDecimals) public nonReentrant {
        _takeUsdt(_usdtAmountDecimals);

        uint256 buyAmount = _getTokenAmountByUsdt(_usdtAmountDecimals);

        // Check if buyer already has a purchase entry
        if (buyerPurchases[msg.sender].amount > 0) {
            // Update existing purchase amount
            buyerPurchases[msg.sender].amount += buyAmount;
        } else {
            // Create a new purchase entry for the buyer
            buyerPurchases[msg.sender] = PurchaseInfo(buyAmount, false);
        }
        
        totalsold += buyAmount;

        _forwardAllUsdtFunds();

        // emit sell event for ui
        emit Sell(msg.sender, buyAmount);

        // Optionally perform immediate claim if defaultAutoClaim is true
        if (defaultAutoClaim) {
            claimTokens(msg.sender);
        }

    }


    function getBoughtTokens(address _buyer) public view returns (uint256) {
        PurchaseInfo storage purchase = buyerPurchases[_buyer];
        return purchase.amount;
    }


    function forwardAllFund() internal {
        uint256 currentBalance = address(this).balance;
        payable(owner()).transfer(currentBalance);
    }

    // // Function for owner to change the token price (in Wei)
    // function setTokenPrice(uint256 _newPrice) public onlyOwner {
    //     require(_newPrice > 0, "Token price cannot be zero");
    //     tokenprice = _newPrice;
    // }

    // Function for owner to change the token address
    function setTokenAddress(address _newTokenAddress) public onlyOwner {
        require(_newTokenAddress != address(0), "Invalid token address"); // Ensure a valid address is provided
        token  = IERC20(_newTokenAddress);
        emit TokenAddressUpdated(token); // Emit an event for tracking changes

    }

    // Function for owner to change the auto claim setting
    function setAutoClaim(bool _autoClaim) public onlyOwner {
        defaultAutoClaim = _autoClaim;
    }


    // Function for owner to change the token price in USDT
    function setTokenPriceInUsdt(uint256 _newPriceInUsdt) public onlyOwner {
        require(_newPriceInUsdt > 0, "Token price in USDT cannot be zero");
        tokenPriceInUsdt = _newPriceInUsdt;
    }


    // Function for owner to change the allow claim setting
    function setAllowClaim(bool _isAllowClaim) public onlyOwner {
        isAllowClaim = _isAllowClaim;
    }

    // Abstract methods to be implemented by derived contracts
    function _forwardAllUsdtFunds() internal virtual;
    function endSale() public virtual;
    function _takeUsdt(uint256 _usdtAmountDecimals) internal  virtual ;
    function _getTokenAmount(uint256 _amount) internal view virtual returns (uint256);
    
     /**
    * @dev Override to extend the way in which ether is converted to tokens.
    * @param usdtInDecimals Value in wei to be converted into tokens
    * @return Number of tokens that can be purchased with the specified usdtInDecimals
    */
    function _getTokenAmountByUsdt(uint256 usdtInDecimals) internal view returns (uint256)
        {
            // Calculate token amount
            uint256 tokens = (usdtInDecimals * (10**token.decimals())) / tokenPriceInUsdt; // Adjust for token decimals
            return tokens;
        }

    // Additional method to transfer ownership
    function changeOwner(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    }

}
 

contract TokenPreSaleBSC is TokenPreSaleCommon{
    IBEP20 public usdtAddress;
    AggregatorV3Interface internal bnbPriceFeed;
    uint256 public bnbFeedPriceDecimals; // Number of decimals for the BNB price feed

    // constructor 
    constructor(address _tokenaddress, address _usdtAddress, uint256 _tokenPriceInUsdt, address _bnbPriceFeedAddress, uint256 _bnbFeedPriceDecimals) 
        TokenPreSaleCommon(_tokenaddress,  _tokenPriceInUsdt) {
        bnbPriceFeed = AggregatorV3Interface(_bnbPriceFeedAddress);
        bnbFeedPriceDecimals = _bnbFeedPriceDecimals;
        usdtAddress = IBEP20(_usdtAddress);
    }

    /**
     * @dev Fetches the latest price of BNB in USDT from the Chainlink oracle.
     */
    function getBNBPrice() public view returns (int) {
        (, int price, , , ) = bnbPriceFeed.latestRoundData();
        return price;
    }

    function _forwardAllUsdtFunds() internal override {
        // Get the current USDT balance of the contract
        uint256 usdtBalance = usdtAddress.balanceOf(address(this));

        try usdtAddress.transfer(owner(), usdtBalance) {
            // revert("USDT transfer failed");
        } catch {
            revert("USDT transfer failed");
        }
    }

    function _takeUsdt(uint256 _usdtAmountDecimals) internal  override {
        // Check allowance (no need for casting as usdtAddress is already IERC20)
        uint256 allowance = usdtAddress.allowance(msg.sender, address(this));
        if (allowance < _usdtAmountDecimals) {
            revert("Insufficient allowance. Please approve spending first.");
        }

        // Transfer USDT (directly using transfer method)
        usdtAddress.transferFrom(msg.sender, address(this), _usdtAmountDecimals);

    }
 

    function endSale() public override {
        // Calculate unsold tokens by subtracting total sold tokens from the contract's token balance
        uint256 unsoldTokens = token.balanceOf(address(this)) - totalsold;

        // Transfer unsold tokens to the owner (assuming owner is the admin)
        token.transfer(owner(), unsoldTokens);

        // Transfer all remaining ETH to the owner
        _forwardAllUsdtFunds();
        forwardAllFund();
    }

    /**
    * @dev Override to extend the way in which ether is converted to tokens.
    * @param _weiAmount Value in wei to be converted into tokens
    * @return Number of tokens that can be purchased with the specified _weiAmount
    */
    function _getTokenAmount(uint256 _weiAmount)
        internal override view returns   (uint256)
    {
        return calculateTokenAmount(_weiAmount);
    }

    /**
     * @dev Calculates the number of tokens a user will receive based on their input of BNB.
     */
    function calculateTokenAmount(uint256 bnbAmount) public view returns (uint256) {
        int256 bnbPrice = getBNBPrice();
        require(bnbPrice > 0, "Invalid BNB price");

         // Calculate the adjustment factor for BNB decimals
        uint256 adjustedBnbPrice = uint256(bnbPrice) * 10 ** (18 - bnbFeedPriceDecimals); // Adjust from bnbPriceDecimals to 18 decimals

        // Convert BNB amount to USDT
        uint256 bnbInUsdt = bnbAmount * adjustedBnbPrice / 10**uint256(36 - usdtAddress.decimals()); // Adjust for BNB decimals 10**(decimals(bnbAmount) + decimals(adjustedBnbPrice) - USDT_DECIMALS);
        
        // Calculate token amount
        uint256 tokens = bnbInUsdt * (10**uint256(token.decimals())) / tokenPriceInUsdt; // Adjust for token decimals
        return tokens;
    }

}


contract TokenPreSaleETH is TokenPreSaleCommon{
    IETH_USDT public usdtAddress;
    AggregatorV3Interface internal ethPriceFeed;
    uint256 public ethFeedPriceDecimals; // Number of decimals for the BNB price feed


    // constructor 
    constructor(address _tokenaddress, address _usdtAddress, uint256 _tokenPriceInUsdt, address _ethPriceFeedAddress, uint256 _ethFeedPriceDecimals) 
        TokenPreSaleCommon(_tokenaddress,  _tokenPriceInUsdt) {
        ethPriceFeed = AggregatorV3Interface(_ethPriceFeedAddress);
        ethFeedPriceDecimals = _ethFeedPriceDecimals;
        usdtAddress = IETH_USDT(_usdtAddress);
    }

    function _forwardAllUsdtFunds() internal override {
        // Get the current USDT balance of the contract
        uint256 usdtBalance = usdtAddress.balanceOf(address(this));

        try usdtAddress.transfer(owner(), usdtBalance) {
            // revert("USDT transfer failed");
        } catch {
            revert("USDT transfer failed");
        }
    }

    function _takeUsdt(uint256 _usdtAmountDecimals) internal  override {
        // Check allowance (no need for casting as usdtAddress is already IERC20)
        uint256 allowance = usdtAddress.allowance(msg.sender, address(this));
        if (allowance < _usdtAmountDecimals) {
            revert("Insufficient allowance. Please approve spending first.");
        }

        // Transfer USDT (directly using transfer method)
        usdtAddress.transferFrom(msg.sender, address(this), _usdtAmountDecimals);

    }
 

    function endSale() public override {
        // Calculate unsold tokens by subtracting total sold tokens from the contract's token balance
        uint256 unsoldTokens = token.balanceOf(address(this)) - totalsold;

        // Transfer unsold tokens to the owner (assuming owner is the admin)
        token.transfer(owner(), unsoldTokens);

        // Transfer all remaining ETH to the owner
        _forwardAllUsdtFunds();
        forwardAllFund();
    }
    
    function getEthPrice() public view returns (int256) {
        (, int256 price, , , ) = ethPriceFeed.latestRoundData();
        return price;
    }

    /**
    * @dev Override to extend the way in which ether is converted to tokens.
    * @param _weiAmount Value in wei to be converted into tokens
    * @return Number of tokens that can be purchased with the specified _weiAmount
    */
    function _getTokenAmount(uint256 _weiAmount)
        internal override view returns   (uint256)
    {
        return calculateTokenAmount(_weiAmount);
    }


    /**
    * @dev Calculates the number of tokens a user will receive based on their input of ETH.
    */
    function calculateTokenAmount(uint256 ethAmount) public view returns (uint256) {
        int256 ethPrice = getEthPrice();
        require(ethPrice > 0, "Invalid ETH price");

        // Calculate the adjustment factor for ETH decimals
        uint256 adjustedEthPrice = uint256(ethPrice) * 10 ** (18 - ethFeedPriceDecimals); // Adjust from bnbPriceDecimals to 18 decimals

        // Convert ETH amount to USDT
        uint256 ethInUsdt =  ethAmount * adjustedEthPrice / (10**uint256(36 - usdtAddress.decimals())); // Adjust for ETH and USDT decimals Adjust for ETH decimals 10**(decimals(bnbAmount) + decimals(adjustedEthPrice) - USDT_DECIMALS);


        // Calculate token amount
        uint256 tokens = ethInUsdt * (10**token.decimals()) / tokenPriceInUsdt; // Adjust for token decimals
        return tokens;
    }
}