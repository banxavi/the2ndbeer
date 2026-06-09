/** Ảnh mẫu từ khách hàng — thay bằng CDN/CMS khi go-live */
import heroBg from '../assets/bg-hero.webp';
import heroBg1 from '../assets/bg-hero_1.webp';
import heroBg2 from '../assets/bg-hero_2.webp';
import ruouNhoCard from '../assets/ruou_nho_card.webp';
import ruouVangCard from '../assets/ruou_vang_card.webp';
import ruouNhoChiTiet from '../assets/ruou_nho_chi_tiet.webp';
import ruouVangChiTiet1 from '../assets/ruou_vang_chi_tiet_1.webp';
import ruouVangChiTiet2 from '../assets/ruou_vang_chi_tiet_2.webp';

/** @deprecated dùng HERO_BANNERS */
export const HERO_BACKGROUNDS = [heroBg, heroBg1, heroBg2];

/**
 * Banner hero kiểu ruouvangcaominh.vn — desktop rộng + mobile vuông riêng.
 * Tạm dùng chung ảnh PC cho mobile cho đến khi khách gửi bản mobile.
 */
export const HERO_BANNERS = [
  { id: 'hero-1', desktop: heroBg, mobile: heroBg, alt: 'Banner LUVINI 1' },
  { id: 'hero-2', desktop: heroBg1, mobile: heroBg1, alt: 'Banner LUVINI 2' },
  { id: 'hero-3', desktop: heroBg2, mobile: heroBg2, alt: 'Banner LUVINI 3' },
];

export const CLIENT_PRODUCT_ASSETS = {
  ruouNho: {
    card: ruouNhoCard,
    gallery: [ruouNhoChiTiet, ruouNhoCard],
  },
  ruouVang: {
    card: ruouVangCard,
    gallery: [ruouVangChiTiet1, ruouVangChiTiet2, ruouVangCard],
  },
};
