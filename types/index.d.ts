interface Cattributes {
  type: string;
  kittyId: number;
  position: string;
  description: string;
}

export interface CryptoKitty {
  id: number;
  name: string;
  image_url: string;
  image_url_cdn: string;
  image_url_png: string;
  image_path: string;
  kitty_items_image_path: string;
  generation: number;
  created_at: string;
  birthday: string;
  color: string;
  kitty_type: string;
  is_fancy: boolean;
  is_exclusive: boolean;
  is_special_edition: boolean;
  fancy_type: string;
  language: string;
  enhanced_cattributes: Cattributes[];
  is_prestige: boolean;
  prestige_type: string;
  prestige_ranking: string;
  prestige_time_limit: string;
  status: {
    cooldown: string;
    dynamic_cooldown: string;
    cooldown_index: string;
    is_ready: boolean;
    is_gestating: boolean;
    cooldown_end_block: string;
    pending_tx_type: string;
    pending_tx_since: string;
  };
  purrs: {
    count: string;
    is_purred: boolean;
  };
  hatcher: {
    address: string;
    image: string;
    nickname: string;
    hasDapper: boolean;
  };
  watchlist: {
    count: string;
    is_watchlisted: boolean;
  };
  hatched: boolean;
  auction: {
    id: number;
    type: string;
    start_price: string;
    end_price: string;
    start_time: string;
    end_time: string;
    current_price: string;
    duration: string;
    status: string;
    seller: {
      address: string;
      isDapper: boolean;
      image: string;
      nickname: string;
    };
  };
  owner: {
    address: string;
    hasDapper: boolean;
    nickname: string;
    image: string;
  };
  sire: {
    id: number;
    name: string;
    image_url: string;
    image_url_cdn: string;
    generation: string;
    created_at: string;
    color: string;
    is_fancy: boolean;
    is_exclusive: boolean;
    fancy_type: string;
    image_url_png: string;
    image_url_kitty_items: string;
  };
  matron: {
    id: number;
    name: string;
    image_url: string;
    image_url_cdn: string;
    generation: string;
    created_at: string;
    color: string;
    is_fancy: boolean;
    is_exclusive: boolean;
    fancy_type: string;
    image_url_png: string;
    image_url_kitty_items: string;
  };
  image_url_kitty_items: string;
}
