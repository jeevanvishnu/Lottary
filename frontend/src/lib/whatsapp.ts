export const handleBuyWhatsApp = (lottery: any) => {
  const phoneNumber = "918078320215";
  const message = `Hello, I want to buy the lottery ticket:

*Name:* ${lottery.lotteryName}
*Lottery No:* ${lottery.lotteryNo}
*Price:* ₹${lottery.price}
*Draw Date:* ${lottery.date} ${lottery.time}
*Winning Prize:* ₹${lottery.jackpotAmount}

Please provide payment details.`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
