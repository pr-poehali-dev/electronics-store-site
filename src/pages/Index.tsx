import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/6aba3e9b-6a86-41b1-ac21-2fb68840162a/files/08de2fef-7beb-4efb-945d-7c614264c6b3.jpg';

const NAV_ITEMS = ['Главная', 'Каталог', 'Контакты'];

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  tag?: string;
  desc: string;
  icon: string;
  image?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Charon +',
    category: 'Электроника',
    price: '300 ₽',
    tag: 'Новинка',
    desc: 'чарон бейби плюс',
    icon: 'Zap',
    image: 'https://plantobacco.com/upload/iblock/44a/ilb7rqszgtw7uf8xhcl92v13mwh9oh3e/54290041533Uxs9pcB4ZI-768x403-1.jpg',
  },
];

const CATEGORIES = ['Все', 'Электроника'];

export default function Index() {
  const [activePage, setActivePage] = useState('Главная');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyType, setNotifyType] = useState({ arrival: true, discount: true });
  const [notifySent, setNotifySent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = activeCategory === 'Все'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifySent(true);
    setNotifyEmail('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-body text-[#EDE8DC]">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-[#0A0A0A] text-xs font-bold">L</span>
            </div>
            <span className="font-display text-xl tracking-widest text-[#EDE8DC]">LUXE</span>
            <span className="font-body text-[0.6rem] tracking-[0.25em] text-[#C9A84C] uppercase mt-1">Electronics</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className={`nav-link ${activePage === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex btn-outline-gold px-5 py-2 rounded-sm text-xs items-center gap-2">
              <Icon name="ShoppingBag" size={13} />
              <span>Корзина</span>
            </button>
            <button
              className="md:hidden text-[#EDE8DC]/60"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => { setActivePage(item); setMenuOpen(false); }}
                className={`nav-link text-left ${activePage === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===================== HOME ===================== */}
      {activePage === 'Главная' && (
        <>
          {/* HERO */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
              <div className="max-w-2xl animate-fade-in">
                <p className="font-body text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A84C] mb-6">
                  Премиум электроника
                </p>
                <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.95] mb-6 text-[#EDE8DC]">
                  Искусство
                  <br />
                  <em className="not-italic gold-shimmer">технологий</em>
                </h1>
                <p className="font-body text-sm font-light tracking-wide text-[#EDE8DC]/60 mb-10 max-w-md leading-relaxed">
                  Отборные устройства от мировых брендов. Каждый продукт — образец инженерной мысли и дизайна.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActivePage('Каталог')}
                    className="btn-gold px-8 py-3.5 rounded-sm"
                  >
                    Смотреть каталог
                  </button>
                  <button
                    onClick={() => setActivePage('Контакты')}
                    className="btn-outline-gold px-8 py-3.5 rounded-sm"
                  >
                    Связаться
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase">Прокрутить</span>
              <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C] to-transparent" />
            </div>
          </section>

          {/* STATS */}
          <section className="border-y border-white/5 bg-[#0D0D0D]">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: '500+', label: 'Товаров в каталоге' },
                { val: '12', label: 'Премиум брендов' },
                { val: '5 лет', label: 'На рынке' },
                { val: '4.9★', label: 'Рейтинг клиентов' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-4xl font-light text-[#C9A84C] mb-1">{s.val}</div>
                  <div className="text-[0.65rem] tracking-[0.15em] uppercase text-[#EDE8DC]/40">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED */}
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Коллекция</p>
                <h2 className="font-display text-5xl font-light text-[#EDE8DC]">Избранное</h2>
              </div>
              <button
                onClick={() => setActivePage('Каталог')}
                className="hidden md:flex btn-outline-gold px-6 py-2.5 rounded-sm items-center gap-2"
              >
                Все товары
                <Icon name="ArrowRight" size={12} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS.slice(0, 3).map((product) => (
                <div key={product.id} className="card-luxury rounded-sm overflow-hidden group cursor-pointer">
                  <div className="h-52 bg-gradient-to-br from-[#1A1A1A] to-[#111111] flex items-center justify-center relative overflow-hidden">
                    {product.image
                      ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      : <Icon name={product.icon as 'Headphones'} size={64} className="text-[#C9A84C]/20 group-hover:text-[#C9A84C]/35 transition-colors duration-500" />
                    }
                    {product.tag && (
                      <span className="badge-new absolute top-4 right-4 px-2.5 py-1 rounded-[2px] uppercase tracking-widest text-[0.55rem]">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[0.58rem] tracking-[0.2em] uppercase text-[#C9A84C]/70 mb-2">{product.category}</p>
                    <h3 className="font-display text-xl font-light mb-2 text-[#EDE8DC]">{product.name}</h3>
                    <p className="text-xs text-[#EDE8DC]/45 leading-relaxed mb-5">{product.desc}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-body font-medium text-[#EDE8DC] text-base">{product.price}</span>
                        {product.oldPrice && (
                          <span className="ml-2 text-xs text-[#EDE8DC]/30 line-through">{product.oldPrice}</span>
                        )}
                      </div>
                      <button className="btn-gold px-4 py-2 rounded-sm">В корзину</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NOTIFY STRIP */}
          <section className="bg-[#0D0D0D] border-y border-[#C9A84C]/10">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Будьте первыми</p>
                <h2 className="font-display text-4xl font-light text-[#EDE8DC] mb-3">Уведомления о поступлениях и скидках</h2>
                <p className="text-xs text-[#EDE8DC]/45 leading-relaxed">Получайте мгновенные уведомления о новых товарах и эксклюзивных предложениях раньше всех.</p>
              </div>
              <div className="md:w-1/2 w-full">
                {notifySent ? (
                  <div className="flex items-center gap-3 text-[#C9A84C]">
                    <Icon name="CheckCircle" size={20} />
                    <span className="font-body text-sm">Вы подписаны! Ждите первыми лучшие предложения.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNotifySubmit} className="space-y-4">
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyType.arrival}
                          onChange={e => setNotifyType(t => ({ ...t, arrival: e.target.checked }))}
                          className="accent-[#C9A84C] w-3 h-3"
                        />
                        <span className="text-[0.65rem] tracking-wide text-[#EDE8DC]/60 uppercase">Поступления</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyType.discount}
                          onChange={e => setNotifyType(t => ({ ...t, discount: e.target.checked }))}
                          className="accent-[#C9A84C] w-3 h-3"
                        />
                        <span className="text-[0.65rem] tracking-wide text-[#EDE8DC]/60 uppercase">Скидки</span>
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        required
                        value={notifyEmail}
                        onChange={e => setNotifyEmail(e.target.value)}
                        placeholder="Ваш email"
                        className="flex-1 bg-[#141414] border border-[#C9A84C]/20 text-[#EDE8DC] placeholder-[#EDE8DC]/25 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9A84C]/60"
                      />
                      <button type="submit" className="btn-gold px-6 py-3 rounded-sm whitespace-nowrap">
                        Подписаться
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===================== CATALOG ===================== */}
      {activePage === 'Каталог' && (
        <section className="max-w-7xl mx-auto px-6 pt-28 pb-24">
          <div className="mb-14">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Все товары</p>
            <h1 className="font-display text-6xl font-light text-[#EDE8DC]">Каталог</h1>
          </div>

          <div className="divider-gold mb-10" />

          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-sm text-[0.65rem] tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat ? 'btn-gold' : 'btn-outline-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-luxury rounded-sm overflow-hidden group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-[#1A1A1A] to-[#111111] flex items-center justify-center relative overflow-hidden">
                  {product.image
                    ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    : <Icon name={product.icon as 'Headphones'} size={56} className="text-[#C9A84C]/20 group-hover:text-[#C9A84C]/35 transition-colors duration-500" />
                  }
                  {product.tag && (
                    <span className="badge-new absolute top-4 right-4 px-2.5 py-1 rounded-[2px] uppercase tracking-widest text-[0.55rem]">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[0.58rem] tracking-[0.2em] uppercase text-[#C9A84C]/70 mb-2">{product.category}</p>
                  <h3 className="font-display text-xl font-light mb-2 text-[#EDE8DC]">{product.name}</h3>
                  <p className="text-xs text-[#EDE8DC]/45 leading-relaxed mb-5">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-body font-medium text-[#EDE8DC] text-base">{product.price}</span>
                      {product.oldPrice && (
                        <span className="ml-2 text-xs text-[#EDE8DC]/30 line-through">{product.oldPrice}</span>
                      )}
                    </div>
                    <button className="btn-gold px-4 py-2 rounded-sm">В корзину</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Package" size={40} className="mx-auto mb-4 text-[#EDE8DC]/20" />
              <p className="font-display text-2xl text-[#EDE8DC]/30">Товары не найдены</p>
            </div>
          )}
        </section>
      )}

      {/* ===================== CONTACTS ===================== */}
      {activePage === 'Контакты' && (
        <section className="max-w-7xl mx-auto px-6 pt-28 pb-24">
          <div className="mb-14">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Всегда на связи</p>
            <h1 className="font-display text-6xl font-light text-[#EDE8DC]">Контакты</h1>
          </div>

          <div className="divider-gold mb-14" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-3xl font-light text-[#EDE8DC] mb-6">Мы рады вашему визиту</h2>
                <p className="text-sm text-[#EDE8DC]/50 leading-relaxed">
                  Наши специалисты помогут подобрать устройство, ответят на вопросы и проконсультируют по любому товару из каталога.
                </p>
              </div>

              {[
                { icon: 'MapPin', title: 'Адрес', val: 'Москва, ул. Тверская, 15' },
                { icon: 'Phone', title: 'Телефон', val: '+7 (495) 000-00-00' },
                { icon: 'Mail', title: 'Email', val: 'hello@luxe-electronics.ru' },
                { icon: 'Clock', title: 'Часы работы', val: 'Пн–Вс: 10:00 — 21:00' },
              ].map(({ icon, title, val }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm border border-[#C9A84C]/25 flex items-center justify-center shrink-0">
                    <Icon name={icon as 'MapPin'} size={15} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]/70 mb-1">{title}</p>
                    <p className="text-sm text-[#EDE8DC]/80">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-luxury rounded-sm p-8">
              <h3 className="font-display text-2xl font-light text-[#EDE8DC] mb-6">Написать нам</h3>
              {contactSent ? (
                <div className="flex flex-col items-center justify-center h-48 gap-4 text-center">
                  <Icon name="CheckCircle" size={36} className="text-[#C9A84C]" />
                  <p className="font-display text-2xl font-light text-[#EDE8DC]">Сообщение отправлено</p>
                  <p className="text-xs text-[#EDE8DC]/45">Мы свяжемся с вами в ближайшее время</p>
                  <button onClick={() => setContactSent(false)} className="btn-outline-gold px-5 py-2 rounded-sm mt-2">
                    Написать ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]/70 mb-2">Имя</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Ваше имя"
                      className="w-full bg-[#111111] border border-[#C9A84C]/15 text-[#EDE8DC] placeholder-[#EDE8DC]/20 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9A84C]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]/70 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full bg-[#111111] border border-[#C9A84C]/15 text-[#EDE8DC] placeholder-[#EDE8DC]/20 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9A84C]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]/70 mb-2">Сообщение</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Ваш вопрос или пожелание..."
                      className="w-full bg-[#111111] border border-[#C9A84C]/15 text-[#EDE8DC] placeholder-[#EDE8DC]/20 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9A84C]/50 resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full py-3.5 rounded-sm">
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-[#0A0A0A] text-[10px] font-bold">L</span>
            </div>
            <span className="font-display text-lg tracking-widest text-[#EDE8DC]/70">LUXE Electronics</span>
          </div>
          <p className="text-[0.6rem] tracking-widest text-[#EDE8DC]/25 uppercase">
            © 2026 · Все права защищены
          </p>
          <div className="flex gap-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className="text-[0.6rem] tracking-[0.15em] uppercase text-[#EDE8DC]/30 hover:text-[#C9A84C] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}