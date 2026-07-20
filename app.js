/* =====================================================
   Currency Rates Controller v4.0
   Developer: نعمان الله بهار
   NEW: Trade system, profit/loss tracking, reports
   ===================================================== */

const STORAGE_KEY = 'currencyAppData_v4';
const HISTORY_KEY = 'currencyAppHistory_v4';
const LANG_KEY = 'currencyAppLang_v4';
const BASE_KEY = 'currencyAppBase_v4';
const TRADES_KEY = 'currencyAppTrades_v4';
const DEVELOPER = {
  name: 'نعمان الله بهار',
  email: 'nemanullahbahar3@gmail.com',
  whatsapp: '0778425738',
  version: '4.0.0',
};

// ===== Default Currencies =====
const DEFAULT_CURRENCIES = [
  { code: 'AFN', name: 'افغانۍ',         nameEn: 'Afghani',       symbol: '؋',   buy: 1,       sell: 1 },
  { code: 'USD', name: 'ډالر',           nameEn: 'US Dollar',     symbol: '$',   buy: 68.5,    sell: 69.5 },
  { code: 'EUR', name: 'یورو',           nameEn: 'Euro',          symbol: '€',   buy: 74.0,    sell: 75.5 },
  { code: 'GBP', name: 'پاونډ',          nameEn: 'British Pound', symbol: '£',   buy: 86.0,    sell: 88.0 },
  { code: 'AED', name: 'درهم',           nameEn: 'UAE Dirham',    symbol: 'د.إ', buy: 18.6,    sell: 19.0 },
  { code: 'SAR', name: 'سعودي ریال',     nameEn: 'Saudi Riyal',   symbol: 'ر.س', buy: 18.2,    sell: 18.5 },
  { code: 'IRR', name: 'ایراني تومان',   nameEn: 'Iranian Toman', symbol: '﷼',   buy: 0.0014,  sell: 0.0015 },
  { code: 'PKR', name: 'پاکستاني روپۍ', nameEn: 'Pakistani Rupee', symbol: '₨',  buy: 0.24,    sell: 0.25 },
  { code: 'INR', name: 'هندي روپۍ',      nameEn: 'Indian Rupee',  symbol: '₹',   buy: 0.82,    sell: 0.84 },
  { code: 'CNY', name: 'چینایي یوان',    nameEn: 'Chinese Yuan',  symbol: '¥',   buy: 9.4,     sell: 9.6 },
  { code: 'TRY', name: 'تروري لیره',     nameEn: 'Turkish Lira',  symbol: '₺',   buy: 1.8,     sell: 1.9 },
  { code: 'RUB', name: 'روبل',           nameEn: 'Russian Ruble', symbol: '₽',   buy: 0.72,    sell: 0.75 },
];

// ===== i18n =====
const I18N = {
  ps: {
    appTitle: 'نرخونو کنټرولر',
    appName: 'نرخونو کنټرولر v4.0',
    subtitle: 'د اسعارو سوداګري — ګټه او تاوان',
    lastUpdate: 'وروستی اپډیٹ:',
    navCalc: 'محاسبه',
    navRates: 'نرخونه',
    navTrade: 'سوداګري',
    navProfit: 'ګټه/تاوان',
    navReports: 'راپورونه',
    navAbout: 'جوړونکی',
    quickCalc: 'چټک محاسبه',
    amount: 'مقدار',
    fromCurrency: 'کرنسی',
    rateMode: 'د نرخ ډول:',
    buy: 'خرید',
    sell: 'فروش',
    both: 'دواړه',
    ratesEditor: 'نرخونه',
    addCurrency: '+ کرنسی',
    save: '💾 ټول خوندي کړئ',
    allCurrencies: 'ټولې کرنسۍ',
    addNewCurrency: 'نوې کرنسی اضافه کړئ',
    currencyName: 'نوم',
    currencyCode: 'کوډ',
    currencySymbol: 'سمبول',
    buyRate: 'د خرید نرخ (افغانۍ)',
    sellRate: 'د فروش نرخ (افغانۍ)',
    cancel: 'لغوه',
    add: 'اضافه کړئ',
    saved: '✓ خوندي شو',
    deleted: '✓ حذف شو',
    added: '✓ اضافه شو',
    buyLabel: 'خرید',
    sellLabel: 'فروش',
    navAll: 'ټولې',
    history: 'تاریخ',
    clear: '🗑️ پاکول',
    historyEmpty: 'لا تاریخ نشته',
    developer: 'د جوړونکي معلومات',
    devName: 'نوم:',
    devEmail: 'بریښنالیک:',
    devWhatsapp: 'واتساپ:',
    devApp: 'اپلیکیشن:',
    devVersion: 'نسخه:',
    devMode: 'حالت:',
    offline: '100% آفلاین',
    madeWith: 'په مینه جوړ شوی',
    aboutTagline: 'ستاسو باور، زما مسؤولیت',
    aboutTitle: 'د اپلیکیشن جوړونکی',
    confirmDelete: 'حذف کړئ؟',
    delete: 'حذف',
    codeExists: 'دا کوډ لا شته',
    keepOne: 'لږ تر لږه یوه کرنسی پاتې شي',
    ratesSaved: 'نرخونه خوندي شول',
    step1: 'مرحله ۱',
    step2: 'مرحله ۲',
    step3: 'مرحله ۳',
    baseCurrencyLabel: 'اصلی کرنسی وټاکئ',
    baseHint: '⚠️ ټول نرخونه د همدې کرنسۍ په مقابل کې محاسبه کېږي',
    baseRatesLabel: 'د اصلی کرنسۍ نرخ (افغانۍ کې)',
    autoHint: '💡 نورې ټولې کرنسۍ اتومات محاسبه کېږي',
    otherRatesLabel: 'نورې کرنسۍ (اتومات محاسبه شوې)',
    edit: 'تعدیل',
    auto: 'اتومات',
    // Trade
    newTrade: 'نوې سوداګري',
    iBuy: 'زه اخلم',
    iBuySub: 'پیسې ورکوم، کرنسی اخلم',
    iSell: 'زه خرڅوم',
    iSellSub: 'کرنسی ورکوم، پیسې اخلم',
    iGive: 'زه ورکوم:',
    iGet: 'زه اخلم:',
    rate: 'نرخ:',
    myCost: 'زما لګښت (افغانۍ):',
    myRevenue: 'زما عاید (افغانۍ):',
    profit: 'ګټه/تاوان:',
    executeTrade: '✅ سوداګري ثبت کړئ',
    todayTrades: 'د نن ورځې سوداګري',
    clearAll: '🗑️ ټول پاک',
    noTrades: 'لا سوداګري نشته',
    tradeRecorded: '✓ سوداګري ثبت شوه',
    tradesCleared: 'ټولې سوداګري پاکې شوې',
    // Profit
    profitSummary: 'د ګټې/تاوان لنډیز',
    totalProfit: 'ټوله ګټه/تاوان:',
    totalTrades: 'ټولې سوداګري',
    winningTrades: 'ګټونکې',
    losingTrades: 'تاوانمنې',
    perCurrency: 'هر کرنسۍ لپاره',
    // Reports
    reports: 'راپورونه',
    today: 'نن',
    thisWeek: 'دا اونۍ',
    thisMonth: 'دا میاشت',
    allTime: 'ټول وخت',
    tradesCount: 'سوداڡري:',
    totalVolume: 'ټول حجم:',
    netProfit: 'خالص ګټه:',
    tradeHistory: 'د سوداګرۍ تاریخ',
    export: '📤 ایکسپورټ',
    noTradesInRange: 'په دې وخت کې سوداګري نشته',
    fillAll: 'ټول خانې ډکې کړئ',
  },
  en: {
    appTitle: 'Currency Controller',
    appName: 'Currency Controller v4.0',
    subtitle: 'Currency Trading — Profit & Loss',
    lastUpdate: 'Last update:',
    navCalc: 'Calc',
    navRates: 'Rates',
    navTrade: 'Trade',
    navProfit: 'Profit',
    navReports: 'Reports',
    navAbout: 'About',
    quickCalc: 'Quick Calculator',
    amount: 'Amount',
    fromCurrency: 'Currency',
    rateMode: 'Rate mode:',
    buy: 'Buy',
    sell: 'Sell',
    both: 'Both',
    ratesEditor: 'Rates',
    addCurrency: '+ Currency',
    save: '💾 Save All',
    allCurrencies: 'All Currencies',
    addNewCurrency: 'Add new currency',
    currencyName: 'Name',
    currencyCode: 'Code',
    currencySymbol: 'Symbol',
    buyRate: 'Buy rate (AFN)',
    sellRate: 'Sell rate (AFN)',
    cancel: 'Cancel',
    add: 'Add',
    saved: '✓ Saved',
    deleted: '✓ Deleted',
    added: '✓ Added',
    buyLabel: 'Buy',
    sellLabel: 'Sell',
    navAll: 'All',
    history: 'History',
    clear: '🗑️ Clear',
    historyEmpty: 'No history yet',
    developer: 'Developer Info',
    devName: 'Name:',
    devEmail: 'Email:',
    devWhatsapp: 'WhatsApp:',
    devApp: 'App:',
    devVersion: 'Version:',
    devMode: 'Mode:',
    offline: '100% Offline',
    madeWith: 'Made with love',
    aboutTagline: 'Your trust, my responsibility',
    aboutTitle: 'App Developer',
    confirmDelete: 'Delete?',
    delete: 'Delete',
    codeExists: 'Code already exists',
    keepOne: 'Keep at least 1 currency',
    ratesSaved: 'Rates saved',
    step1: 'Step 1',
    step2: 'Step 2',
    step3: 'Step 3',
    baseCurrencyLabel: 'Select base currency',
    baseHint: '⚠️ All other rates calculated against this',
    baseRatesLabel: 'Base currency rates (in AFN)',
    autoHint: '💡 Other currencies auto-calculated',
    otherRatesLabel: 'Other currencies (auto)',
    edit: 'Edit',
    auto: 'Auto',
    newTrade: 'New Trade',
    iBuy: 'I Buy',
    iBuySub: 'I give money, get currency',
    iSell: 'I Sell',
    iSellSub: 'I give currency, get money',
    iGive: 'I Give:',
    iGet: 'I Get:',
    rate: 'Rate:',
    myCost: 'My Cost (AFN):',
    myRevenue: 'My Revenue (AFN):',
    profit: 'Profit/Loss:',
    executeTrade: '✅ Record Trade',
    todayTrades: "Today's Trades",
    clearAll: '🗑️ Clear All',
    noTrades: 'No trades yet',
    tradeRecorded: '✓ Trade recorded',
    tradesCleared: 'All trades cleared',
    profitSummary: 'Profit/Loss Summary',
    totalProfit: 'Total Profit/Loss:',
    totalTrades: 'Total Trades',
    winningTrades: 'Winning',
    losingTrades: 'Losing',
    perCurrency: 'Per Currency',
    reports: 'Reports',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    allTime: 'All Time',
    tradesCount: 'Trades:',
    totalVolume: 'Total Volume:',
    netProfit: 'Net Profit:',
    tradeHistory: 'Trade History',
    export: '📤 Export',
    noTradesInRange: 'No trades in this period',
    fillAll: 'Please fill all fields',
  }
};

// ===== State =====
let state = {
  currencies: [...DEFAULT_CURRENCIES],
  lastUpdate: null,
  calcMode: 'buy',
  lang: 'ps',
  currentTab: 'calc',
  pendingDelete: null,
  baseCurrency: 'AFN',
  baseBuy: 1,
  baseSell: 1,
  // Trade state
  tradeDirection: 'buy', // 'buy' = I give money, get currency; 'sell' = I give currency, get money
  trades: [],
  reportRange: 'today',
};

// ===== Utilities =====
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

function t(key) { return I18N[state.lang][key] || key; }

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.currencies && data.currencies.length) {
        state.currencies = data.currencies;
        state.lastUpdate = data.lastUpdate;
      }
    }
    const baseRaw = localStorage.getItem(BASE_KEY);
    if (baseRaw) {
      const b = JSON.parse(baseRaw);
      state.baseCurrency = b.baseCurrency || 'AFN';
      state.baseBuy = b.baseBuy || 1;
      state.baseSell = b.baseSell || 1;
    }
    const tradesRaw = localStorage.getItem(TRADES_KEY);
    if (tradesRaw) {
      state.trades = JSON.parse(tradesRaw);
    }
  } catch (e) { console.error('Load failed', e); }
}

function saveData(showToast = true) {
  state.lastUpdate = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currencies: state.currencies,
    lastUpdate: state.lastUpdate,
  }));
  localStorage.setItem(BASE_KEY, JSON.stringify({
    baseCurrency: state.baseCurrency,
    baseBuy: state.baseBuy,
    baseSell: state.baseSell,
  }));
  if (showToast) toast(t('saved'), 'success');
  updateLastUpdateTime();
}

function saveTrades() {
  localStorage.setItem(TRADES_KEY, JSON.stringify(state.trades));
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function addHistory(text) {
  const list = loadHistory();
  list.unshift({ time: new Date().toISOString(), text });
  if (list.length > 100) list.length = 100;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}

function loadLang() {
  state.lang = localStorage.getItem(LANG_KEY) || 'ps';
}

function saveLang() {
  localStorage.setItem(LANG_KEY, state.lang);
}

function formatNumber(n) {
  if (n === null || n === undefined || isNaN(n)) return '0';
  const abs = Math.abs(n);
  if (abs >= 100) return Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (abs >= 1) return Number(n).toLocaleString('en-US', { maximumFractionDigits: 4 });
  if (abs >= 0.001) return Number(n).toFixed(6).replace(/0+$/, '').replace(/\.?0+$/, '');
  return Number(n).toFixed(8).replace(/0+$/, '').replace(/\.?0+$/, '');
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const date = d.toLocaleDateString(state.lang === 'ps' ? 'ps-AF' : 'en-US');
  const time = d.toLocaleTimeString(state.lang === 'ps' ? 'ps-AF' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString(state.lang === 'ps' ? 'ps-AF' : 'en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

function toast(msg, type = '') {
  const el = $('toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2500);
}

// ===== Trade Logic =====
/*
  Trade logic:
  - Direction 'buy' (I buy currency): I give AFN, get foreign currency at SELL rate (the bank's sell rate)
    Wait, let's think more carefully:
    - When I "buy" USD: I give AFN, receive USD. The price I pay is bank's SELL rate (bank sells USD to me).
      Actually: bank's SELL rate is what bank sells the currency at. So when I buy USD from bank, I pay at bank's SELL rate.
    - When I "sell" USD: I give USD, receive AFN. Bank's BUY rate is what bank buys at. So I receive at bank's BUY rate.
  
  So for clarity:
  - "I buy currency" (I receive currency, give AFN): cost = amount * currency.SELL (in AFN)
  - "I sell currency" (I give currency, receive AFN): revenue = amount * currency.BUY (in AFN)
  
  But the user said:
  "د رانیولو او خرڅولو نرخونه ورسوم" - show both buy and sell rates
  "د اخیستنی او خرڅولاو جلا ارزښت ښکاره شی" - show value of buying vs selling separately
  
  So the trade interface should:
  - Let user enter: from currency (what they give) and to currency (what they get)
  - If "I buy USD" (give AFN, get USD):
    - I pay AFN at USD's SELL rate (bank sells USD to me)
    - My cost in AFN: amount * USD.sell
  - If "I sell USD" (give USD, get AFN):
    - I receive AFN at USD's BUY rate (bank buys USD from me)
    - My revenue in AFN: amount * USD.buy
  
  Profit/loss = revenue - cost (or just revenue if no cost)
  For a single trade: profit is implicit difference.
  
  Better interpretation: a trade means you convert currency A to currency B.
  - "I buy" foreign currency: pay AFN (or any currency), get foreign currency
  - "I sell" foreign currency: give foreign currency, get AFN (or any currency)
  
  The user's "profit/loss" tracking is to track:
  - Each trade: how much you gained/lost compared to the OTHER side of the trade
  
  Example: User buys 300 USD with 20550 AFN. Later user sells those 300 USD for 20500 AFN.
  - Trade 1 (Buy): cost = 20550, revenue = 0, profit = -20550 (you spent money)
  - Trade 2 (Sell): cost = 0, revenue = 20500, profit = 20500 (you got money back)
  - Net profit = -50 AFN (you lost 50 AFN)
  
  Hmm, this is tricky. Let me re-read user:
  "کله کومه کرنسی تبادله کوم هغه ثبت شی" - when I exchange currency, record it
  "وروسته ماته ګټه او تاوان داسی معلوم کړی" - then show me profit/loss
  "چی ډال دومره ګټه کړی ده ریال دومره" - so USD this much profit, SAR this much
  
  So per-currency profit tracking. The most natural interpretation:
  - Each trade: from currency X (amount A) to currency Y (amount B)
  - Profit = what you got in Y - what that Y is "worth" in terms of X
  - Or simpler: track NET position per currency and unrealized P/L
  
  Let me implement a simpler model:
  - Each trade is recorded as: (give currency, give amount, get currency, get amount, rate, cost in AFN, revenue in AFN, profit in AFN)
  - Profit in AFN for the trade = (revenue AFN) - (cost AFN)
    - For "buy" trade: cost = amount * sell_rate (in AFN), revenue = 0
    - For "sell" trade: cost = 0, revenue = amount * buy_rate (in AFN)
  - The "buy" and "sell" are the TWO SIDES of an exchange, not a single trade.
  
  Actually, simplest model that matches user's request:
  - A "trade" is a single exchange: from currency A to currency B
  - direction = 'buy' means user is buying foreign currency (gives AFN, gets foreign)
  - direction = 'sell' means user is selling foreign currency (gives foreign, gets AFN)
  - For each trade we calculate the profit = the spread between buy and sell rates
    - If you "buy" at sell rate, and the rate hasn't changed, you've "lost" the spread
    - If you "sell" at buy rate, you've "gained" the spread minus the original cost
  - This is a simplification but matches the user's intuition
  
  Let me go with this:
  - Trade: { time, direction, fromCurrency, fromAmount, toCurrency, toAmount, costAFN, revenueAFN, profitAFN }
  - For 'buy' (user gets foreign currency):
    - fromCurrency = AFN, fromAmount = X
    - toCurrency = USD, toAmount = X / USD.sell
    - costAFN = X
    - revenueAFN = 0 (nothing received in AFN)
    - profitAFN = -X (you spent this, negative profit)
  - For 'sell' (user gives foreign currency):
    - fromCurrency = USD, fromAmount = X
    - toCurrency = AFN, toAmount = X * USD.buy
    - costAFN = 0
    - revenueAFN = X * USD.buy
    - profitAFN = X * USD.buy (positive)
  
  Per-currency profit: sum of profitAFN for trades involving that currency.
*/

function calculateTradePreview() {
  const giveAmt = parseFloat($('tradeGiveAmount').value) || 0;
  const giveCode = $('tradeGiveCurrency').value;
  const getCode = $('tradeGetCurrency').value;
  const giveC = state.currencies.find(c => c.code === giveCode);
  const getC = state.currencies.find(c => c.code === getCode);
  if (!giveC || !getC) return null;

  // Convert give amount to AFN
  let giveInAFN, getAmount, getInAFN, costAFN, revenueAFN, profitAFN;
  
  if (giveCode === 'AFN') {
    // giving AFN, receiving foreign currency
    giveInAFN = giveAmt;
    getAmount = giveAmt / getC.sell;
    getInAFN = getAmount * getC.buy;  // what that foreign currency is "worth" in AFN at buy rate
    costAFN = giveAmt;
    revenueAFN = 0;
    // profit = revenue - cost
    profitAFN = getInAFN - giveAmt;
  } else if (getCode === 'AFN') {
    // giving foreign currency, receiving AFN
    giveInAFN = giveAmt * giveC.buy;  // worth in AFN at buy rate
    getAmount = giveAmt * giveC.buy;
    costAFN = 0;
    revenueAFN = getAmount;
    profitAFN = revenueAFN;
  } else {
    // giving foreign A, receiving foreign B (via AFN)
    giveInAFN = giveAmt * giveC.buy;
    getAmount = giveInAFN / getC.sell;
    getInAFN = getAmount * getC.buy;
    costAFN = 0; // complicated
    revenueAFN = 0;
    profitAFN = getInAFN - giveInAFN;
  }

  return {
    giveCode, giveAmt, giveC,
    getCode, getAmount, getC,
    giveInAFN, getInAFN, costAFN, revenueAFN, profitAFN
  };
}

function updateTradePreview() {
  const preview = calculateTradePreview();
  if (!preview) return;

  // Show give rate
  $('tradeGiveRate').textContent = preview.giveCode === 'AFN' 
    ? '1' 
    : `${formatNumber(preview.giveC.buy)}/${formatNumber(preview.giveC.sell)} AFN`;
  
  // Show get rate
  $('tradeGetRate').textContent = preview.getCode === 'AFN'
    ? '1'
    : `${formatNumber(preview.getC.buy)}/${formatNumber(preview.getC.sell)} AFN`;

  // Update get amount
  $('tradeGetAmount').value = formatNumber(preview.getAmount);

  // Update summary
  $('myCostValue').textContent = formatNumber(preview.costAFN) + ' AFN';
  $('myRevenueValue').textContent = formatNumber(preview.revenueAFN) + ' AFN';
  
  const profitEl = $('profitValue');
  profitEl.textContent = (preview.profitAFN >= 0 ? '+' : '') + formatNumber(preview.profitAFN) + ' AFN';
  if (preview.profitAFN > 0) {
    profitEl.className = 'cost-value profit-text';
  } else if (preview.profitAFN < 0) {
    profitEl.className = 'cost-value loss-text';
  } else {
    profitEl.className = 'cost-value';
  }
}

function executeTrade() {
  const giveAmt = parseFloat($('tradeGiveAmount').value) || 0;
  if (giveAmt <= 0) { toast(t('fillAll'), 'error'); return; }
  
  const preview = calculateTradePreview();
  if (!preview) return;
  
  const trade = {
    id: Date.now(),
    time: new Date().toISOString(),
    direction: state.tradeDirection,
    giveCode: preview.giveCode,
    giveAmount: preview.giveAmt,
    giveSymbol: preview.giveC.symbol,
    giveName: state.lang === 'ps' ? preview.giveC.name : preview.giveC.nameEn,
    getCode: preview.getCode,
    getAmount: preview.getAmount,
    getSymbol: preview.getC.symbol,
    getName: state.lang === 'ps' ? preview.getC.name : preview.getC.nameEn,
    costAFN: preview.costAFN,
    revenueAFN: preview.revenueAFN,
    profitAFN: preview.profitAFN,
  };
  
  state.trades.unshift(trade);
  saveTrades();
  renderTodayTrades();
  renderProfitSummary();
  renderReports();
  toast(t('tradeRecorded'), 'success');
  
  // Reset form
  $('tradeGiveAmount').value = '';
  updateTradePreview();
}

function deleteTrade(id) {
  state.trades = state.trades.filter(tr => tr.id !== id);
  saveTrades();
  renderTodayTrades();
  renderProfitSummary();
  renderReports();
  toast(t('deleted'), 'success');
}

function clearAllTrades() {
  if (!confirm(state.lang === 'ps' ? 'ټولې سوداګري پاک کړئ؟' : 'Clear all trades?')) return;
  state.trades = [];
  saveTrades();
  renderTodayTrades();
  renderProfitSummary();
  renderReports();
  toast(t('tradesCleared'), 'success');
}

function renderTodayTrades() {
  const today = new Date().toDateString();
  const todayTrades = state.trades.filter(tr => new Date(tr.time).toDateString() === today);
  const container = $('todayTrades');
  if (!todayTrades.length) {
    container.innerHTML = `<div class="trade-empty">${t('noTrades')}</div>`;
    return;
  }
  container.innerHTML = todayTrades.map(tr => renderTradeItem(tr)).join('');
}

function renderTradeItem(tr) {
  const profitClass = tr.profitAFN > 0 ? 'positive' : (tr.profitAFN < 0 ? 'negative' : '');
  return `
    <div class="trade-item ${tr.direction}">
      <div class="trade-item-header">
        <span class="trade-item-direction ${tr.direction}">${tr.direction === 'buy' ? '📥 ' + t('iBuy') : '📤 ' + t('iSell')}</span>
        <span class="trade-item-time">${formatDateTime(tr.time)}</span>
        <button class="trade-item-delete" data-action="delete-trade" data-id="${tr.id}">✕</button>
      </div>
      <div class="trade-item-body">
        <div class="trade-item-flow">
          <span><strong>${formatNumber(tr.giveAmount)}</strong> ${tr.giveSymbol} ${tr.giveName}</span>
          <span class="arrow">→</span>
          <span><strong>${formatNumber(tr.getAmount)}</strong> ${tr.getSymbol} ${tr.getName}</span>
        </div>
      </div>
      <div class="trade-item-footer">
        <span>${t('myCost')}: ${formatNumber(tr.costAFN)} AFN</span>
        <span>${t('myRevenue')}: ${formatNumber(tr.revenueAFN)} AFN</span>
        <span class="trade-item-profit ${profitClass}">${t('profit')} ${tr.profitAFN >= 0 ? '+' : ''}${formatNumber(tr.profitAFN)} AFN</span>
      </div>
    </div>
  `;
}

function getFilteredTrades() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(today);
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  
  switch (state.reportRange) {
    case 'today': return state.trades.filter(tr => new Date(tr.time) >= today);
    case 'week': return state.trades.filter(tr => new Date(tr.time) >= weekAgo);
    case 'month': return state.trades.filter(tr => new Date(tr.time) >= monthAgo);
    case 'all': return state.trades;
    default: return state.trades;
  }
}

function renderProfitSummary() {
  // Use all trades for the summary
  const allTrades = state.trades;
  let totalProfit = 0;
  let winning = 0;
  let losing = 0;
  
  allTrades.forEach(tr => {
    totalProfit += tr.profitAFN || 0;
    if (tr.profitAFN > 0) winning++;
    else if (tr.profitAFN < 0) losing++;
  });
  
  const profitEl = $('totalProfitValue');
  profitEl.textContent = (totalProfit >= 0 ? '+' : '') + formatNumber(totalProfit) + ' AFN';
  profitEl.className = 'big-profit-value' + (totalProfit < 0 ? ' loss' : '');
  
  $('totalProfitSub').textContent = state.lang === 'ps' 
    ? `${allTrades.length} سوداګري څخه ${winning} ګټونکې`
    : `${winning} winning of ${allTrades.length} trades`;
  
  $('totalTradesCount').textContent = allTrades.length;
  $('winningTradesCount').textContent = winning;
  $('losingTradesCount').textContent = losing;
  
  // Per currency
  const perCurrency = {};
  allTrades.forEach(tr => {
    // Profit is attributed to BOTH currencies involved (split)
    const giveKey = tr.giveCode;
    const getKey = tr.getCode;
    perCurrency[giveKey] = perCurrency[giveKey] || { profit: 0, count: 0, currency: state.currencies.find(c => c.code === giveKey) };
    perCurrency[giveKey].profit += tr.profitAFN;
    perCurrency[giveKey].count += 1;
  });
  
  const container = $('perCurrencyProfit');
  const entries = Object.values(perCurrency).filter(e => e.currency);
  if (!entries.length) {
    container.innerHTML = `<div class="trade-empty">${t('noTrades')}</div>`;
    return;
  }
  entries.sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit));
  
  container.innerHTML = entries.map(e => {
    const cls = e.profit > 0 ? 'positive' : (e.profit < 0 ? 'negative' : 'zero');
    const sign = e.profit > 0 ? '+' : '';
    return `
      <div class="per-currency-row">
        <div class="per-currency-left">
          <span class="per-currency-symbol">${e.currency.symbol}</span>
          <div>
            <div class="per-currency-name">${state.lang === 'ps' ? e.currency.name : e.currency.nameEn} (${e.currency.code})</div>
            <div class="per-currency-trades">${e.count} ${state.lang === 'ps' ? 'سوداګري' : 'trades'}</div>
          </div>
        </div>
        <div class="per-currency-amount ${cls}">${sign}${formatNumber(e.profit)} AFN</div>
      </div>
    `;
  }).join('');
}

function renderReports() {
  const filtered = getFilteredTrades();
  let totalVolume = 0;
  let netProfit = 0;
  filtered.forEach(tr => {
    totalVolume += tr.costAFN + tr.revenueAFN;
    netProfit += tr.profitAFN || 0;
  });
  
  $('reportTradesCount').textContent = filtered.length;
  $('reportTotalVolume').textContent = formatNumber(totalVolume) + ' AFN';
  const profitEl = $('reportNetProfit');
  profitEl.textContent = (netProfit >= 0 ? '+' : '') + formatNumber(netProfit) + ' AFN';
  profitEl.className = 'report-stat-value ' + (netProfit > 0 ? 'profit-text' : (netProfit < 0 ? 'loss-text' : ''));
  
  const container = $('allTrades');
  if (!filtered.length) {
    container.innerHTML = `<div class="trade-empty">${t('noTradesInRange')}</div>`;
    return;
  }
  container.innerHTML = filtered.map(tr => renderTradeItem(tr)).join('');
}

function exportTrades() {
  const filtered = getFilteredTrades();
  let csv = '\uFEFF'; // BOM for UTF-8
  csv += 'ID,Date,Direction,Give Currency,Give Amount,Get Currency,Get Amount,Cost AFN,Revenue AFN,Profit AFN\n';
  filtered.forEach(tr => {
    csv += `${tr.id},${tr.time},${tr.direction},${tr.giveCode},${tr.giveAmount},${tr.getCode},${tr.getAmount},${tr.costAFN},${tr.revenueAFN},${tr.profitAFN}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `trades-${state.reportRange}-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(state.lang === 'ps' ? '✓ ایکسپورټ شو' : '✓ Exported', 'success');
}

// ===== Render =====
function renderI18n() {
  $$('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.documentElement.lang = state.lang === 'ps' ? 'ps' : 'en';
  document.documentElement.dir = 'rtl';
}

function updateLastUpdateTime() {
  $('lastUpdateTime').textContent = formatDate(state.lastUpdate);
}

function switchTab(tab) {
  state.currentTab = tab;
  $$('.tab-content').forEach(el => el.classList.remove('active'));
  $$('.nav-item').forEach(el => el.classList.remove('active'));
  const tabEl = $('tab-' + tab);
  if (tabEl) tabEl.classList.add('active');
  const navEl = document.querySelector(`.nav-item[data-tab="${tab}"]`);
  if (navEl) navEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCalcCurrencyOptions() {
  const sel = $('calcCurrency');
  sel.innerHTML = state.currencies
    .map(c => `<option value="${c.code}">${c.symbol} ${state.lang === 'ps' ? c.name : c.nameEn} (${c.code})</option>`)
    .join('');
}

function renderTradeCurrencyOptions() {
  ['tradeGiveCurrency', 'tradeGetCurrency'].forEach(id => {
    const sel = $(id);
    sel.innerHTML = state.currencies
      .map(c => `<option value="${c.code}">${c.symbol} ${c.code}</option>`)
      .join('');
  });
  // Set defaults: give=AFN, get=USD
  $('tradeGiveCurrency').value = 'AFN';
  $('tradeGetCurrency').value = 'USD';
}

function renderBaseCurrencyOptions() {
  const sel = $('baseCurrencySelect');
  sel.innerHTML = state.currencies
    .map(c => `<option value="${c.code}" ${c.code === state.baseCurrency ? 'selected' : ''}>${c.symbol} ${state.lang === 'ps' ? c.name : c.nameEn} (${c.code})</option>`)
    .join('');
}

function showBaseRatesBox() {
  $('baseRatesBox').classList.remove('hidden');
  $('allRatesBox').classList.remove('hidden');
  $('baseBuyRate').value = state.baseBuy;
  $('baseSellRate').value = state.baseSell;
  renderAutoRates();
}

function renderAutoRates() {
  const base = state.currencies.find(c => c.code === state.baseCurrency);
  if (!base) return;
  const container = $('ratesContainer');
  const others = state.currencies.filter(c => c.code !== state.baseCurrency);
  container.innerHTML = others.map(c => {
    const cBuyInBase = c.buy / base.buy;
    const cSellInBase = c.sell / base.sell;
    return `
      <div class="rate-item auto-calculated" data-code="${c.code}">
        <div class="rate-item-header">
          <div class="rate-currency-info">
            <span class="rate-symbol">${c.symbol}</span>
            <div>
              <div class="rate-name">${state.lang === 'ps' ? c.name : c.nameEn}</div>
              <div class="rate-code">${c.code} <span class="auto-badge">${t('auto')}</span></div>
            </div>
          </div>
          <button class="rate-delete" data-action="delete" data-code="${c.code}" title="${t('delete')}">✕</button>
        </div>
        <div class="rate-inputs">
          <div class="rate-input-group buy">
            <label>${t('buyLabel')}</label>
            <input type="number" inputmode="decimal" step="0.0001" data-field="buy" data-code="${c.code}" class="rate-input" value="${formatNumber(cBuyInBase)}">
          </div>
          <div class="rate-input-group sell">
            <label>${t('sellLabel')}</label>
            <input type="number" inputmode="decimal" step="0.0001" data-field="sell" data-code="${c.code}" class="rate-input" value="${formatNumber(cSellInBase)}">
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function performCalculation() {
  const amount = parseFloat($('calcAmount').value) || 0;
  const fromCode = $('calcCurrency').value;
  const from = state.currencies.find(c => c.code === fromCode);
  if (!from) return;

  const results = state.currencies
    .filter(c => c.code !== fromCode)
    .map(c => {
      const afnAmount = amount * from.buy;
      const targetAmount = afnAmount / c.sell;
      return { currency: c, amount: targetAmount, buy: c.buy, sell: c.sell };
    });

  const container = $('calcResults');
  if (state.calcMode === 'both') {
    container.innerHTML = results.map(r => `
      <div class="calc-mode-row">
        <div class="calc-result-item buy">
          <div class="calc-result-info">
            <span class="calc-result-symbol">${r.currency.symbol}</span>
            <div>
              <div class="calc-result-name">${state.lang === 'ps' ? r.currency.name : r.currency.nameEn}</div>
              <div class="calc-result-code">${r.currency.code} • ${t('buyLabel')}</div>
            </div>
          </div>
          <div class="calc-result-value">${formatNumber(r.amount * r.sell / r.buy)}</div>
        </div>
        <div class="calc-result-item sell">
          <div class="calc-result-info">
            <span class="calc-result-symbol">${r.currency.symbol}</span>
            <div>
              <div class="calc-result-name">${state.lang === 'ps' ? r.currency.name : r.currency.nameEn}</div>
              <div class="calc-result-code">${r.currency.code} • ${t('sellLabel')}</div>
            </div>
          </div>
          <div class="calc-result-value">${formatNumber(r.amount)}</div>
        </div>
      </div>
    `).join('');
  } else {
    container.innerHTML = results.map(r => {
      const isBuy = state.calcMode === 'buy';
      const finalAmount = isBuy ? (r.amount * r.sell / r.buy) : r.amount;
      return `
        <div class="calc-result-item ${isBuy ? 'buy' : 'sell'}">
          <div class="calc-result-info">
            <span class="calc-result-symbol">${r.currency.symbol}</span>
            <div>
              <div class="calc-result-name">${state.lang === 'ps' ? r.currency.name : r.currency.nameEn}</div>
              <div class="calc-result-code">${r.currency.code}</div>
            </div>
          </div>
          <div class="calc-result-value">${formatNumber(finalAmount)}</div>
        </div>
      `;
    }).join('');
  }
}

// ===== Event Handlers =====
function bindEvents() {
  $$('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Calc
  $('calcAmount').addEventListener('input', performCalculation);
  $('calcCurrency').addEventListener('change', performCalculation);
  $$('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.calcMode = btn.dataset.mode;
      performCalculation();
    });
  });

  // Rates
  $('baseCurrencySelect').addEventListener('change', (e) => {
    state.baseCurrency = e.target.value;
    const base = state.currencies.find(c => c.code === state.baseCurrency);
    if (base) { state.baseBuy = base.buy; state.baseSell = base.sell; }
    showBaseRatesBox();
    saveData(false);
  });
  $('editBaseBtn').addEventListener('click', () => {
    showBaseRatesBox();
    $('baseBuyRate').focus();
  });
  $('baseBuyRate').addEventListener('input', (e) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v > 0) {
      state.baseBuy = v;
      const base = state.currencies.find(c => c.code === state.baseCurrency);
      if (base) base.buy = v;
      renderAutoRates();
    }
  });
  $('baseSellRate').addEventListener('input', (e) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v > 0) {
      state.baseSell = v;
      const base = state.currencies.find(c => c.code === state.baseCurrency);
      if (base) base.sell = v;
      renderAutoRates();
    }
  });
  $('ratesContainer').addEventListener('input', (e) => {
    const target = e.target;
    if (target.matches('input[data-field]')) {
      const code = target.dataset.code;
      const field = target.dataset.field;
      const currency = state.currencies.find(c => c.code === code);
      if (currency) {
        const base = state.currencies.find(c => c.code === state.baseCurrency);
        const val = parseFloat(target.value);
        if (!isNaN(val) && base) {
          currency[field] = val * base[field];
        }
      }
    }
  });
  $('ratesContainer').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action="delete"]');
    if (target) handleDeleteCurrency(target.dataset.code);
  });
  $('saveRatesBtn').addEventListener('click', () => saveData(true));

  // Trade
  $$('.trade-direction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.trade-direction-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.tradeDirection = btn.dataset.direction;
      // Swap defaults based on direction
      if (state.tradeDirection === 'buy') {
        $('tradeGiveCurrency').value = 'AFN';
        $('tradeGetCurrency').value = 'USD';
      } else {
        $('tradeGiveCurrency').value = 'USD';
        $('tradeGetCurrency').value = 'AFN';
      }
      updateTradePreview();
    });
  });
  $('tradeGiveAmount').addEventListener('input', updateTradePreview);
  $('tradeGiveCurrency').addEventListener('change', updateTradePreview);
  $('tradeGetCurrency').addEventListener('change', updateTradePreview);
  $('swapBtn').addEventListener('click', () => {
    const give = $('tradeGiveCurrency').value;
    const get = $('tradeGetCurrency').value;
    const giveAmt = $('tradeGiveAmount').value;
    const getAmt = $('tradeGetAmount').value;
    $('tradeGiveCurrency').value = get;
    $('tradeGetCurrency').value = give;
    $('tradeGiveAmount').value = getAmt;
    $('tradeGetAmount').value = '';
    updateTradePreview();
  });
  $('executeTradeBtn').addEventListener('click', executeTrade);
  $('clearTradesBtn').addEventListener('click', clearAllTrades);
  $('todayTrades').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action="delete-trade"]');
    if (target) deleteTrade(parseInt(target.dataset.id));
  });
  $('allTrades').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action="delete-trade"]');
    if (target) deleteTrade(parseInt(target.dataset.id));
  });

  // Reports
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.reportRange = btn.dataset.range;
      renderReports();
    });
  });
  $('exportBtn').addEventListener('click', exportTrades);

  // Add currency
  $('addCurrencyBtn').addEventListener('click', () => {
    $('addModal').classList.remove('hidden');
    $('newCurrencyName').focus();
  });
  $('cancelAddBtn').addEventListener('click', () => $('addModal').classList.add('hidden'));
  $('confirmAddBtn').addEventListener('click', () => {
    const name = $('newCurrencyName').value.trim();
    const code = $('newCurrencyCode').value.trim().toUpperCase();
    const symbol = $('newCurrencySymbol').value.trim() || code;
    const buy = parseFloat($('newBuyRate').value);
    const sell = parseFloat($('newSellRate').value);
    if (!name || !code) { toast(t('fillAll'), 'error'); return; }
    if (isNaN(buy) || isNaN(sell)) { toast(t('invalidRates') || 'Invalid', 'error'); return; }
    if (state.currencies.find(c => c.code === code)) { toast(t('codeExists'), 'error'); return; }
    state.currencies.push({ code, name, nameEn: name, symbol, buy, sell });
    saveData(false);
    renderAll();
    switchTab('rates');
    $('addModal').classList.add('hidden');
    ['newCurrencyName', 'newCurrencyCode', 'newCurrencySymbol', 'newBuyRate', 'newSellRate'].forEach(id => $(id).value = '');
    toast(t('added'), 'success');
  });
  $('addModal').addEventListener('click', (e) => { if (e.target.id === 'addModal') $('addModal').classList.add('hidden'); });
  $('deleteModal').addEventListener('click', (e) => { if (e.target.id === 'deleteModal') $('deleteModal').classList.add('hidden'); });
  $('cancelDeleteBtn').addEventListener('click', () => { state.pendingDelete = null; $('deleteModal').classList.add('hidden'); });
  $('confirmDeleteBtn').addEventListener('click', () => {
    if (state.pendingDelete) {
      state.currencies = state.currencies.filter(c => c.code !== state.pendingDelete);
      if (state.baseCurrency === state.pendingDelete) {
        state.baseCurrency = state.currencies[0]?.code || 'AFN';
        const base = state.currencies.find(c => c.code === state.baseCurrency);
        if (base) { state.baseBuy = base.buy; state.baseSell = base.sell; }
      }
      state.pendingDelete = null;
      $('deleteModal').classList.add('hidden');
      renderAll();
      toast(t('deleted'), 'success');
    }
  });

  $('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'ps' ? 'en' : 'ps';
    saveLang();
    renderAll();
  });
}

function handleDeleteCurrency(code) {
  if (state.currencies.length <= 1) { toast(t('keepOne'), 'error'); return; }
  if (code === state.baseCurrency) {
    toast(state.lang === 'ps' ? 'لومړی اصلی کرنسی بدله کړئ' : 'Change base currency first', 'error');
    return;
  }
  const c = state.currencies.find(x => x.code === code);
  state.pendingDelete = code;
  $('deleteMessage').textContent = state.lang === 'ps'
    ? `${c.symbol} ${c.name} (${c.code}) حذف کړئ؟`
    : `Delete ${c.symbol} ${c.nameEn} (${c.code})?`;
  $('deleteModal').classList.remove('hidden');
}

function renderAll() {
  renderI18n();
  updateLastUpdateTime();
  renderCalcCurrencyOptions();
  renderTradeCurrencyOptions();
  renderBaseCurrencyOptions();
  showBaseRatesBox();
  renderTodayTrades();
  renderProfitSummary();
  renderReports();
  updateTradePreview();
  performCalculation();
}

function init() {
  loadLang();
  loadData();
  bindEvents();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
