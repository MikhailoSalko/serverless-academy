const markup = (list) => {
  const markup = list
    .map((el) => {
      const obj = {
        UAH: el.base_ccy || "UAH",
        sale: el.sale || el.rateSell,
        buy: el.buy || el.rateBuy,
      };
      return `
    -----------------------------------------------------------
    Base currecy:  ${obj.UAH}        Sale                Buy
    PrivatBank:               ${obj.sale}       ${obj.sale}
    Monomank:               ${obj.buy}         ${obj.buy}
    -----------------------------------------------------------
    `;
    })
    .join("");
  return markup;
};

export default markup;
