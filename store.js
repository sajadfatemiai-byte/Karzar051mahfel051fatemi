/**
 * کارزار جهاد اقتصادی محفل - مشهد مقدس • بلوار توس
 * Store Engine, Cart Persistence & Rubika Integration (Vanilla JS)
 */

// Helper to convert English digits to Persian
function toPersianDigits(n) {
  if (n === null || n === undefined) return '';
  const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/[0-9]/g, function (w) {
    return persian[+w];
  });
}

// Convert Persian digits to English for calculations
function toEnglishDigits(str) {
  if (!str) return '0';
  return String(str).replace(/[۰-۹]/g, function (w) {
    return '۰۱۲۳۴۵۶۷۸۹'.indexOf(w);
  });
}

// Default Product Database
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'خدمات پاک کردن زعفران (کیلویی/دستمزد تعاون)',
    category: 'services',
    categoryName: 'خدمات و اشتغال خانگی',
    price: 300,
    oldPrice: 450,
    unit: 'تومان (هر کیلو)',
    badge: 'خدمت جهادی',
    stock: 'فعال / نامحدود',
    isSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMyCni9sZk1Nr8_qAAKIzwCGYw9W5YoQQ0pvwu22PqWe5B0BbKJYVLj0TEu-T6nAvPTvCMZYK0n5bVUxbYiNOpK2ZyRaFGgLdmHn9PWiax0Z14qVPL0fpyOaZDZ3BNtTcIJQ_etcJILOiQoqQxQvnjpd5hJ4-OfVQedPxDjfisej_o9107UkGgTmVsJfKpZrRRh_Y3Iz4PchebaiugL-Rkg_z7Fl2ci7x8UZJAc2Cq',
    description: 'پاک‌کردن کاملاً بهداشتی، بدون ریزش کلاله، با بسته‌بندی تمیز در محله توس مشهد توسط بانوان سرپرست خانوار.'
  },
  {
    id: 2,
    title: 'عینک طبی مقاوم فریم سبک و عدسی آنتی‌رفلکس',
    category: 'health',
    categoryName: 'سلامت و بینایی‌سنجی',
    price: 850,
    oldPrice: 1200,
    unit: 'تومان',
    badge: 'سلامت و بینایی',
    stock: '۴۲ عدد در انبار',
    isSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpQffQ5Mi_EEUQrgqN5Gn4baXMMk8AcJpmwTrIbOzkPd0ZAm3Zdh0r8SF_lf203aLMAqVDTsYG3FZf-Qs12P9QC3khs9VCq-J_7sTiwWkc5P24Id6oEsyoInNzwclnddKR5NE5ADHMgTXEN5ym4_EA1dtHWJj6OWcETrZvGJocJZ3w7gZz1hpj7rYerlwcOu7C-b51DwDU9LYP8zB88Lws3KoBU4WkWxUbM0HZZ5Em',
    description: 'فریم ضدحساسیت با مقاومت بالا و عدسی‌های فیلتر نور آبی، مناسب مطالعه و کار با نمایشگر با قیمت توزیع جهادی.'
  },
  {
    id: 3,
    title: 'زعفران سرگل ممتاز قائنات (بسته یک مثقالی)',
    category: 'agriculture',
    categoryName: 'محصولات کشاورزی و طبیعی',
    price: 400,
    oldPrice: 490,
    unit: 'تومان',
    badge: 'سوغات اصیل',
    stock: '۱۱۰ بسته آماده',
    isSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFHbGxzhuOnlaTtySadW6_DGZFub2p3Ct5Q1UF0A2NY373ILHVN7Euz3_sXgib23JfaoQjP3t1dyerWPdwosLOZh5ZptC93UJLig8lnjNG-KRCgvmjLWmxF5nz-OaLeRyENP2QN5c2nzOvrkhMY1WBl5-j8F_eERtbEOtxssJziNsZxHGOUkmU4RQt5WA-yDOmtcYqhbvgM7W07fktp5M3akGtlC6yChC6c2XPmNTI',
    description: 'عطر و رنگ‌دهی فوق‌العاده، برگه آزمایش سلامت، خشک‌شده با دستگاه‌های پیشرفته تحت نظارت بهداشتی.'
  },
  {
    id: 4,
    title: 'عسل طبیعی چهل‌گیاه کوهستان (یک کیلوگرم)',
    category: 'agriculture',
    categoryName: 'محصولات کشاورزی و طبیعی',
    price: 330,
    oldPrice: 420,
    unit: 'تومان',
    badge: 'صددرصد ارگانیک',
    stock: '۸ کیلوگرم',
    isSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGQWqCKny5wvI-itUQ3_BxdFhethu8crHMdR5Rs7NESSQIWFBvC-89LRn-zHqKJilpfoVjf2ljeY4QmvwO7K-AgTbAzhiyl7E8TQepZFMvsqLw0iDJovHJmW889dPlX_Uzrc5_3AKPoNgZjBt9PdSi-YSC-bT6ScYcy_uKyVcXGDpVyCOW2MjFNsNgcJGNb17TYlS274rrgkzxUphjXA0eXeqMvPQ4X4BxGgQJrtYE',
    description: 'خام و حرارت‌ندیده با ساکارز زیر ۲ درصد، مناسب تقویت عمومی بدن و تقویت سیستم ایمنی خانواده.'
  },
  {
    id: 5,
    title: 'عرق نعناع دوآتشه سنتی ۱ لیتری',
    category: 'agriculture',
    categoryName: 'محصولات کشاورزی و طبیعی',
    price: 55,
    oldPrice: 70,
    unit: 'تومان',
    badge: 'سنتی دیگ مسی',
    stock: '۱۸ بطری',
    isSpecial: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DgmMY2rgXpRcxIU9L-R26FRvSstLVTVUQEpCCSZgB5NZXM9K5Hng4pP7Pi97-RgDDUdDBx3-58SyYd2Z6WrNgdewwIdx_qdW8OR7lzAw1q7pzyFviI9-bTBHWeQoTOjBPJmxywLT5iriZ3fwjO6uoddpyP9kNwdH2Hn2G3vKA6HevZNLihiaVt7KGVjzksJJfiImLqnU3jSfESUFdn8E0D3xQBLGarfaZ8Y5Vs44',
    description: 'تقطیر سنتی به روش کهن، بسیار معطر و غلیظ بدون هیچ‌گونه اسانس شیمیایی.'
  },
  {
    id: 6,
    title: 'پاپوش و جوراب پشمی سنتی دستباف',
    category: 'handicrafts',
    categoryName: 'صنایع دستی و بانوان',
    price: 110,
    oldPrice: 140,
    unit: 'تومان',
    badge: 'صنایع دستی',
    stock: '۱۲ جفت',
    isSpecial: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIIN7V7yO-_Nsx6FOGgZytTdilxl-wjtjNty09XTZetZxoAsMtq4h4kBHIvcGwe663rp_aKJCk4b17VVTrDkKcmdg9h3VnkmZ4hiy35C8qjki2oDTOrMriem_OQ1j_Tx1sy1pfQX2QL-zxzvHoAYtj_HrWTrf0oabihxCjv9vHTN3Z5L_lQurNhdgnqeBU9aqKrjfi11nJOveEqRGdXsuk1BRV8RmmwIEXXEZcaDRZ',
    description: 'بافته‌شده با پشم خالص گوسفندی توسط بانوان هنرمند محله، گرما و دوام فوق‌العاده.'
  },
  {
    id: 7,
    title: 'حلوا خرمایی کنجدی با مغز گردو',
    category: 'agriculture',
    categoryName: 'محصولات کشاورزی و طبیعی',
    price: 85,
    oldPrice: 105,
    unit: 'تومان',
    badge: 'سوغات مقوی',
    stock: '۲۵ بسته',
    isSpecial: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMFhCDpuI7n5NtvMQo5w4L_Am8SYrfuyUbmk-fenErI18OYCxz-V5gA3V723d_K-T9Mc0KStkg34L2wHpKlDA2JEECny8Hl-GSZKwYzedl5zUoMNnJRp8bgkdnpJBnYAkYU5ucv-s6dtK-Y5R7HQVTe_O70zn73t7NbWyqSuWNb6uhGqwo7Dy3lgmAPoCk2DK892TlWpZjEyR25yp6TvVTrstpTd-uxi5gp83Ka8Mc',
    description: 'تهیه‌شده از خرمای بم تازه و روغن کنجد خالص، بدون شکر صنعتی و کاملاً سالم.'
  },
  {
    id: 8,
    title: 'روغن سیاهدانه اصل پرس سرد',
    category: 'health',
    categoryName: 'سلامت و بینایی‌سنجی',
    price: 140,
    oldPrice: 175,
    unit: 'تومان',
    badge: 'فرابکر',
    stock: '۹ عدد',
    isSpecial: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpYA9tQ652B8cAxJGUVMCiRoHUt6tn59AFDj0JY_18pDCaaNhftI48Zihtc0rQZI5OvfJZOq5T8aS4RWDCQT_4XirgnD7t-UllocZMEDAN5efjfcsqRwSZg75eEjILPnXL6KOXwtZ6oMeLAFQK-9yR3IEwlud8Qi2yjhriAcnDXvXXOUJHcriootaHBvB0O5DJDAQTtypANPz7UMMY6f6Q0PyRusNfWdOQ7SWB1Pui',
    description: 'تسکین دردهای مفصلی و تقویت ریشه مو، استخراج‌شده در حضور مشتری با دستگاه استاندارد.'
  }
];

// Initialize or load products
function getProducts() {
  const stored = localStorage.getItem('mahfel_products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('mahfel_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem('mahfel_products', JSON.stringify(products));
}

// Cart Storage Functions
function getCart() {
  const stored = localStorage.getItem('mahfel_cart');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  // Default initial cart state (Saffron cleaning + Medical glasses)
  const defaultCart = [
    {
      id: 1,
      title: 'خدمات پاک کردن زعفران (کیلویی/دستمزد تعاون)',
      category: 'services',
      price: 300,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMyCni9sZk1Nr8_qAAKIzwCGYw9W5YoQQ0pvwu22PqWe5B0BbKJYVLj0TEu-T6nAvPTvCMZYK0n5bVUxbYiNOpK2ZyRaFGgLdmHn9PWiax0Z14qVPL0fpyOaZDZ3BNtTcIJQ_etcJILOiQoqQxQvnjpd5hJ4-OfVQedPxDjfisej_o9107UkGgTmVsJfKpZrRRh_Y3Iz4PchebaiugL-Rkg_z7Fl2ci7x8UZJAc2Cq'
    },
    {
      id: 2,
      title: 'عینک طبی مقاوم فریم سبک و عدسی آنتی‌رفلکس',
      category: 'health',
      price: 850,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpQffQ5Mi_EEUQrgqN5Gn4baXMMk8AcJpmwTrIbOzkPd0ZAm3Zdh0r8SF_lf203aLMAqVDTsYG3FZf-Qs12P9QC3khs9VCq-J_7sTiwWkc5P24Id6oEsyoInNzwclnddKR5NE5ADHMgTXEN5ym4_EA1dtHWJj6OWcETrZvGJocJZ3w7gZz1hpj7rYerlwcOu7C-b51DwDU9LYP8zB88Lws3KoBU4WkWxUbM0HZZ5Em'
    }
  ];
  localStorage.setItem('mahfel_cart', JSON.stringify(defaultCart));
  return defaultCart;
}

function saveCart(cart) {
  localStorage.setItem('mahfel_cart', JSON.stringify(cart));
  updateHeaderCartBadges();
}

function addToCart(title, price, image, id) {
  const cart = getCart();
  const existing = cart.find(item => (id && item.id === id) || item.title === title);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: id || Date.now(),
      title: title,
      price: Number(price),
      qty: 1,
      image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQtd4dG2yun0BALPCLFUfCCB9MHRcq2ZVAcNYcdxc76Re1lt7AxzHblo_MAFLTrfCI8oyItwhjhcG0zN-lqRB1YBa5jir-T-IQbkIVpnSo5kzRnkjFi1u6PLTdAeI1QOT9fLK6GSRol-JRe-7yorUNz4qA1DrV6bzDrFtxEsndQgvfWVsGkYRMZgoeaqprDIX_4TEkuvixzsRDwC5Hj_X-iAl3ARTdeGI42grlgMDk'
    });
  }
  saveCart(cart);
  showToast(`«${title}» با مبلغ ${toPersianDigits(price)} تومان به سبد خرید اضافه شد.`);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

function updateCartQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      return removeFromCart(id);
    }
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartTotals() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = rawSubtotal > 50 ? 50 : 0;
  const finalPayable = Math.max(0, rawSubtotal - discount);
  return { totalCount, rawSubtotal, discount, finalPayable };
}

function updateHeaderCartBadges() {
  const totals = getCartTotals();
  const badges = document.querySelectorAll('[data-cart-badge]');
  badges.forEach(b => {
    b.textContent = toPersianDigits(totals.totalCount);
  });
}

// Toast Feedback Notification System
function showToast(message) {
  let toastContainer = document.getElementById('global-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'global-toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'bg-on-surface text-surface-container-lowest px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 border border-surface-container-high/20';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-secondary-container text-xl">check_circle</span>
    <span class="font-body-md text-body-md">${message}</span>
  `;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// Initial Mock Orders Database for Admin
const INITIAL_ORDERS = [
  {
    id: '#MF-9482',
    customer: 'فاطمه رضایی‌فر',
    phone: '09151234567',
    items: 'زعفران سرگل قائنات (۳ مثقال) + عرق نعنا سنتی',
    amount: '۱,۴۵۰,۰۰۰',
    rawAmount: 1450000,
    date: 'امروز - ۱۴:۲۰',
    status: 'جدید',
    zone: 'مشهد مقدس - منطقه بلوار توس'
  },
  {
    id: '#MF-9481',
    customer: 'محسن تقی‌زاده',
    phone: '09359871122',
    items: 'عینک طبی دید دور (فریم کائوچویی نمره ۱.۵)',
    amount: '۸۹۰,۰۰۰',
    rawAmount: 890000,
    date: 'امروز - ۱۱:۰۵',
    status: 'در حال آماده‌سازی',
    zone: 'مشهد مقدس - بلوار توس'
  },
  {
    id: '#MF-9479',
    customer: 'علی‌اصغر مهدوی',
    phone: '09124458890',
    items: 'بسته اقتصادی خدمت پاک کردن زعفران (۱۰ کیلوگرم گل)',
    amount: '۲,۱۰۰,۰۰۰',
    rawAmount: 2100000,
    date: 'دیروز - ۱۸:۳۰',
    status: 'ارسال شده',
    zone: 'مشهد مقدس - ارسال سراسری'
  },
  {
    id: '#MF-9475',
    customer: 'زهرا سادات حسینی',
    phone: '09367495875',
    items: 'روغن زیتون طبیعی رودبار (۲ لیتری) + کشمش سایه خشک',
    amount: '۶۲۰,۰۰۰',
    rawAmount: 620000,
    date: '۱۸ اسفند - ۰۹:۱۵',
    status: 'تکمیل شده',
    zone: 'مشهد مقدس - بلوار توس'
  },
  {
    id: '#MF-9470',
    customer: 'مهدی کاظمی',
    phone: '09025553311',
    items: 'عینک مطالعه بلوکات ضد اشعه مانیتور',
    amount: '۴۵۰,۰۰۰',
    rawAmount: 450000,
    date: '۱۷ اسفند - ۲۱:۴۵',
    status: 'لغو شده',
    zone: 'مشهد مقدس'
  }
];

function getOrders() {
  const stored = localStorage.getItem('mahfel_orders');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('mahfel_orders', JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem('mahfel_orders', JSON.stringify(orders));
}

// Store Settings Management (Phone, Rubika URL/ID, Address, Announcements)
const DEFAULT_STORE_SETTINGS = {
  phone: '09367495875',
  phoneDisplay: '۰۹۳۶۷۴۹۵۸۷۵',
  rubikaUrl: 'https://rubika.ir/karzarmahfel184',
  rubikaId: 'karzarmahfel184@',
  address: 'مشهد مقدس، بلوار توس، توس ۱۸۴',
  announcement: '🌺 عرضه بی‌واسطه زعفران قائنات، عینک طبی و عسل طبیعی با نرخ جهادی و تحویل در محله توس مشهد',
  hours: 'همه روزه ۸:۰۰ الی ۲۱:۰۰'
};

function getStoreSettings() {
  const stored = localStorage.getItem('mahfel_store_settings');
  if (stored) {
    try {
      return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(stored) };
    } catch (e) {
      console.error(e);
    }
  }
  return DEFAULT_STORE_SETTINGS;
}

function saveStoreSettings(settings) {
  const current = getStoreSettings();
  const updated = { ...current, ...settings };
  if (!updated.phoneDisplay) {
    updated.phoneDisplay = toPersianDigits(updated.phone);
  }
  localStorage.setItem('mahfel_store_settings', JSON.stringify(updated));
  applyStoreSettingsToDOM();
  return updated;
}

function applyStoreSettingsToDOM() {
  const settings = getStoreSettings();

  // Update all tel: links
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.href = `tel:${settings.phone}`;
  });

  // Update elements displaying phone
  document.querySelectorAll('[data-store-phone]').forEach(el => {
    el.textContent = settings.phoneDisplay || toPersianDigits(settings.phone);
  });

  // Update all Rubika channel links
  document.querySelectorAll('a[href*="rubika.ir"]').forEach(el => {
    el.href = settings.rubikaUrl;
  });

  // Update elements displaying Rubika ID
  document.querySelectorAll('[data-store-rubika-id]').forEach(el => {
    el.textContent = settings.rubikaId;
  });

  // Update elements displaying address
  document.querySelectorAll('[data-store-address]').forEach(el => {
    el.textContent = settings.address;
  });

  // Update announcement texts
  document.querySelectorAll('[data-store-announcement]').forEach(el => {
    el.textContent = settings.announcement;
  });

  // Update hours
  document.querySelectorAll('[data-store-hours]').forEach(el => {
    el.textContent = settings.hours;
  });
}

// Rubika Order Generation & Sharing
function formatRubikaOrderMessage(orderData) {
  const settings = getStoreSettings();
  const { code, name, phone, address, zone, notes, items, finalTotal } = orderData;
  let text = `🛒 *سفارش جدید از وب‌سایت جهاد اقتصادی محفل*\n`;
  text += `🔖 *کد سفارش:* ${code}\n`;
  text += `👤 *نام خریدار:* ${name}\n`;
  text += `📞 *تلفن تماس:* ${phone}\n`;
  text += `📍 *محدوده:* ${zone || 'مشهد مقدس'}\n`;
  text += `🏠 *آدرس:* ${address || settings.address}\n`;
  if (notes) text += `📝 *توضیحات:* ${notes}\n`;
  text += `\n📦 *اقلام سفارش:*\n`;
  if (items && items.length) {
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.title} (تعداد: ${item.qty} × ${toPersianDigits(item.price.toLocaleString())} تومان)\n`;
    });
  }
  text += `\n💰 *مبلغ قابل پرداخت:* ${toPersianDigits(finalTotal.toLocaleString())} تومان\n`;
  text += `\n✨ کارزار جهاد اقتصادی محفل - ${settings.address}\n`;
  text += `📞 پشتیبانی تلفنی: ${settings.phoneDisplay || toPersianDigits(settings.phone)}\n`;
  text += `🌐 کانال روبیکا: ${settings.rubikaUrl}`;
  return text;
}

function sendOrderViaRubika(orderData) {
  const settings = getStoreSettings();
  const text = formatRubikaOrderMessage(orderData);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
  window.open(settings.rubikaUrl, '_blank');
}


// Auto init cart badges, store settings, and active bottom tabs on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  applyStoreSettingsToDOM();
  updateHeaderCartBadges();
  highlightActiveBottomTab();
});

// Mobile Drawer Menu Controllers
function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('hidden')) {
    drawer.classList.remove('hidden');
    drawer.classList.add('flex');
    document.body.style.overflow = 'hidden';
  } else {
    closeMobileDrawer();
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.add('hidden');
  drawer.classList.remove('flex');
  document.body.style.overflow = '';
}

// Highlight current page in mobile bottom navigation bar
function highlightActiveBottomTab() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const bottomTabs = document.querySelectorAll('[data-nav-page]');
  bottomTabs.forEach(tab => {
    const page = tab.getAttribute('data-nav-page');
    if (page === path || (path === '' && page === 'index.html')) {
      tab.classList.add('tab-active', 'text-primary');
      tab.classList.remove('text-on-surface-variant');
    } else {
      tab.classList.remove('tab-active', 'text-primary');
      tab.classList.add('text-on-surface-variant');
    }
  });
}

