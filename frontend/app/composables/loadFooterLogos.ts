import type {FooterLogo} from "~/types/data";

export default async function () {
  const store = useState<FooterLogo[]>('footer_logos');

  const logos: FooterLogo[] = [
    {
      img: '/img/footer/saramad.png',
      alt: '',
      href: '#',
    },
    {
      img: '/img/footer/nezam_rayaneh.png',
      alt: '',
      href: '#',
    },
    {
      img: '/img/footer/khallagh.png',
      alt: '',
      href: '#',
    },
    {
      img: '/img/footer/iso_logo.png',
      alt: '',
      href: '#',
    },
  ];

  store.value = logos;
}