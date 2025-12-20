export interface VietnamCity {
  name: string;
  code: number;
  division_type: 'thành phố trung ương' | 'tỉnh';
  codename: string;
  phone_code: number;
  wards: any[];
}

export const VIETNAM_CITIES: VietnamCity[] = [
  {
    name: "Thành phố Hà Nội",
    code: 1,
    division_type: "thành phố trung ương",
    codename: "ha_noi",
    phone_code: 24,
    wards: []
  },
  {
    name: "Cao Bằng",
    code: 4,
    division_type: "tỉnh",
    codename: "cao_bang",
    phone_code: 206,
    wards: []
  },
  {
    name: "Tuyên Quang",
    code: 8,
    division_type: "tỉnh",
    codename: "tuyen_quang",
    phone_code: 207,
    wards: []
  },
  {
    name: "Điện Biên",
    code: 11,
    division_type: "tỉnh",
    codename: "dien_bien",
    phone_code: 215,
    wards: []
  },
  {
    name: "Lai Châu",
    code: 12,
    division_type: "tỉnh",
    codename: "lai_chau",
    phone_code: 213,
    wards: []
  },
  {
    name: "Sơn La",
    code: 14,
    division_type: "tỉnh",
    codename: "son_la",
    phone_code: 212,
    wards: []
  },
  {
    name: "Lào Cai",
    code: 15,
    division_type: "tỉnh",
    codename: "lao_cai",
    phone_code: 214,
    wards: []
  },
  {
    name: "Thái Nguyên",
    code: 19,
    division_type: "tỉnh",
    codename: "thai_nguyen",
    phone_code: 208,
    wards: []
  },
  {
    name: "Lạng Sơn",
    code: 20,
    division_type: "tỉnh",
    codename: "lang_son",
    phone_code: 205,
    wards: []
  },
  {
    name: "Quảng Ninh",
    code: 22,
    division_type: "tỉnh",
    codename: "quang_ninh",
    phone_code: 203,
    wards: []
  },
  {
    name: "Bắc Ninh",
    code: 24,
    division_type: "tỉnh",
    codename: "bac_ninh",
    phone_code: 222,
    wards: []
  },
  {
    name: "Phú Thọ",
    code: 25,
    division_type: "tỉnh",
    codename: "phu_tho",
    phone_code: 210,
    wards: []
  },
  {
    name: "Thành phố Hải Phòng",
    code: 31,
    division_type: "thành phố trung ương",
    codename: "hai_phong",
    phone_code: 225,
    wards: []
  },
  {
    name: "Hưng Yên",
    code: 33,
    division_type: "tỉnh",
    codename: "hung_yen",
    phone_code: 221,
    wards: []
  },
  {
    name: "Ninh Bình",
    code: 37,
    division_type: "tỉnh",
    codename: "ninh_binh",
    phone_code: 229,
    wards: []
  },
  {
    name: "Thanh Hóa",
    code: 38,
    division_type: "tỉnh",
    codename: "thanh_hoa",
    phone_code: 237,
    wards: []
  },
  {
    name: "Nghệ An",
    code: 40,
    division_type: "tỉnh",
    codename: "nghe_an",
    phone_code: 238,
    wards: []
  },
  {
    name: "Hà Tĩnh",
    code: 42,
    division_type: "tỉnh",
    codename: "ha_tinh",
    phone_code: 239,
    wards: []
  },
  {
    name: "Quảng Trị",
    code: 44,
    division_type: "tỉnh",
    codename: "quang_tri",
    phone_code: 233,
    wards: []
  },
  {
    name: "Thành phố Huế",
    code: 46,
    division_type: "thành phố trung ương",
    codename: "hue",
    phone_code: 234,
    wards: []
  },
  {
    name: "Thành phố Đà Nẵng",
    code: 48,
    division_type: "thành phố trung ương",
    codename: "da_nang",
    phone_code: 236,
    wards: []
  },
  {
    name: "Quảng Ngãi",
    code: 51,
    division_type: "tỉnh",
    codename: "quang_ngai",
    phone_code: 255,
    wards: []
  },
  {
    name: "Gia Lai",
    code: 52,
    division_type: "tỉnh",
    codename: "gia_lai",
    phone_code: 269,
    wards: []
  },
  {
    name: "Khánh Hòa",
    code: 56,
    division_type: "tỉnh",
    codename: "khanh_hoa",
    phone_code: 258,
    wards: []
  },
  {
    name: "Đắk Lắk",
    code: 66,
    division_type: "tỉnh",
    codename: "dak_lak",
    phone_code: 262,
    wards: []
  },
  {
    name: "Lâm Đồng",
    code: 68,
    division_type: "tỉnh",
    codename: "lam_dong",
    phone_code: 263,
    wards: []
  },
  {
    name: "Đồng Nai",
    code: 75,
    division_type: "tỉnh",
    codename: "dong_nai",
    phone_code: 251,
    wards: []
  },
  {
    name: "Thành phố Hồ Chí Minh",
    code: 79,
    division_type: "thành phố trung ương",
    codename: "ho_chi_minh",
    phone_code: 28,
    wards: []
  },
  {
    name: "Tây Ninh",
    code: 80,
    division_type: "tỉnh",
    codename: "tay_ninh",
    phone_code: 276,
    wards: []
  },
  {
    name: "Đồng Tháp",
    code: 82,
    division_type: "tỉnh",
    codename: "dong_thap",
    phone_code: 277,
    wards: []
  },
  {
    name: "Vĩnh Long",
    code: 86,
    division_type: "tỉnh",
    codename: "vinh_long",
    phone_code: 270,
    wards: []
  },
  {
    name: "An Giang",
    code: 91,
    division_type: "tỉnh",
    codename: "an_giang",
    phone_code: 296,
    wards: []
  },
  {
    name: "Thành phố Cần Thơ",
    code: 92,
    division_type: "thành phố trung ương",
    codename: "can_tho",
    phone_code: 292,
    wards: []
  },
  {
    name: "Cà Mau",
    code: 96,
    division_type: "tỉnh",
    codename: "ca_mau",
    phone_code: 290,
    wards: []
  }
];

// Helper function to get icon for a city
export const getCityIcon = (codename: string): string => {
  const iconMap: Record<string, string> = {
    ha_noi: '🏛️',
    ho_chi_minh: '🏙️',
    da_nang: '🌊',
    can_tho: '🌾',
    hai_phong: '⚓',
    hue: '🏯',
    dong_nai: '🏭',
    khanh_hoa: '🏖️',
    quang_ninh: '⛰️',
    lam_dong: '🌲',
    dak_lak: '☕',
    gia_lai: '🌄',
  };

  return iconMap[codename] || '📍';
};

// Helper function to format city display name
export const formatCityName = (name: string, divisionType: string): string => {
  // Remove "Thành phố" or "Tỉnh" prefix if exists
  let displayName = name
    .replace(/^Thành phố\s+/i, '')
    .replace(/^Tỉnh\s+/i, '');

  // Add appropriate prefix based on division type
  if (divisionType === 'thành phố trung ương') {
    return `TP. ${displayName}`;
  }

  return displayName;
};
