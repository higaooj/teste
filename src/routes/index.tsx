import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  Star,
  ChevronDown,
  MousePointerClick,
  PhoneCall,
  CheckCircle2,
  Truck,
  Instagram,
  Facebook,
  Menu,
  X,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import heroImg from "../assets/hero-album.jpg";
import productAlbum from "../assets/product-album.jpg";
import productPacks from "../assets/product-packs.jpg";
import productDispenser from "../assets/product-dispenser.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SuperAlbum — Figurinhas e Álbuns da Copa do Mundo 2026" },
      { name: "description", content: "Compre kits, combos e pacotes Panini da Copa 2026 direto pelo WhatsApp. Produtos originais, atendimento humano e envio para todo o Brasil." },
      { property: "og:title", content: "SuperAlbum — Figurinhas e Álbuns da Copa 2026" },
      { property: "og:description", content: "Kits e combos para montar seu álbum da Copa 2026. Atendimento via WhatsApp." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        name: "SuperAlbum",
        description: "Loja especializada em figurinhas e álbuns da Copa do Mundo 2026.",
        priceRange: "R$",
      }),
    }],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "5567998971339";
const wa = (product?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    product ? `Olá! Quero comprar: ${product}` : "Olá! Quero comprar figurinhas da Copa 2026."
  )}`;

/* ------------------ Reusable animated section ------------------ */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: "easeOut" });
    const unsub = rounded.on("change", setVal);
    return () => { controls.stop(); unsub(); };
  }, [inView, to, mv, rounded]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ------------------ Header ------------------ */
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#kits", label: "Kits" },
    { href: "#como-funciona", label: "Como Funciona" },
    { href: "#avaliacoes", label: "Avaliações" },
    { href: "#suporte", label: "Suporte" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-primary/85 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-gold flex items-center justify-center shadow-gold-glow">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display font-extrabold text-white text-lg tracking-tight">
            Super<span className="text-gold">Album</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={wa()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-whatsapp-foreground hover:scale-105 hover:shadow-whatsapp-glow transition-all duration-200"
        >
          <MessageCircle className="h-4 w-4" />
          Comprar pelo WhatsApp
        </a>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-primary px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-white/90 font-medium py-2">
              {l.label}
            </a>
          ))}
          <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground">
            <MessageCircle className="h-4 w-4" /> Comprar pelo WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

/* ------------------ Hero ------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 stadium-lights opacity-70 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" /> Coleção Copa 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05]"
          >
            Kits e combos para montar seu <span className="text-gold-gradient">álbum sem perder tempo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-white/75 max-w-xl"
          >
            Escolha pacotes de figurinhas ou combos com álbum e receba tudo organizado para começar sua coleção.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#kits" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-primary hover:scale-105 hover:shadow-gold-glow transition-all">
              <ShoppingBag className="h-4 w-4" /> Ver Pacotes
            </a>
            <a href="#avaliacoes" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              <Star className="h-4 w-4" /> Ver Avaliações
            </a>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {[
              { icon: PackageCheck, title: "Separação rápida", desc: "Pedido conferido antes do envio." },
              { icon: ShieldCheck, title: "Compra segura", desc: "Atendimento humano via WhatsApp." },
              { icon: Sparkles, title: "Kits e combos", desc: "Opções para todas as fases da coleção." },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 hover:bg-white/[0.08] hover:border-gold/30 transition-all"
              >
                <b.icon className="h-5 w-5 text-gold" />
                <div className="mt-2 text-sm font-semibold text-white">{b.title}</div>
                <div className="text-xs text-white/60 mt-0.5">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-gold/20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={heroImg} alt="Álbum e pacotes da Copa do Mundo 2026" width={1024} height={1024} className="w-full h-auto" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-whatsapp/15 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-whatsapp" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Pedido confirmado</div>
              <div className="text-sm font-bold text-primary">Kit 50 pacotes</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------ Stats ------------------ */
function Stats() {
  const stats = [
    { value: 3, suffix: "+", label: "Kits disponíveis" },
    { value: 12, suffix: "+", label: "Combos completos" },
    { value: 100, suffix: "%", label: "Atendimento via WhatsApp" },
  ];
  return (
    <section className="bg-primary-deep border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold text-gold-gradient font-display">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs sm:text-sm text-white/70 uppercase tracking-wider font-medium">{s.label}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ------------------ Products ------------------ */
type Product = {
  id: string;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  image: string;
  badge?: string;
};
const products: Product[] = [
  { id: "1", title: "Álbum Brochura + Kit 50 Pacotes", category: "Combo com Álbum", price: "R$ 239,90", oldPrice: "R$ 289,90", image: productAlbum, badge: "Mais Vendido" },
  { id: "2", title: "Kit 100 Pacotes de Figurinhas", category: "Kit Avulso", price: "R$ 349,90", image: productPacks, badge: "Top" },
  { id: "3", title: "Dispenser Oficial com 50 Pacotes", category: "Dispenser", price: "R$ 269,90", image: productDispenser },
  { id: "4", title: "Álbum Capa Dura + Kit 80 Pacotes", category: "Combo Premium", price: "R$ 389,90", oldPrice: "R$ 449,90", image: productAlbum, badge: "Premium" },
  { id: "5", title: "Kit Iniciante 25 Pacotes", category: "Kit Avulso", price: "R$ 99,90", image: productPacks },
  { id: "6", title: "Combo Família — 2 Álbuns + 100 Pacotes", category: "Combo com Álbum", price: "R$ 549,90", oldPrice: "R$ 629,90", image: productDispenser, badge: "Oferta" },
  { id: "7", title: "Kit 200 Pacotes — Caixa Fechada", category: "Atacado", price: "R$ 649,90", image: productPacks },
  { id: "8", title: "Álbum Capa Dura Oficial", category: "Álbum", price: "R$ 79,90", image: productAlbum },
];

function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
      className="group rounded-2xl bg-white border border-border overflow-hidden hover:border-gold/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.title}
          width={800}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {p.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-md">
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{p.category}</div>
        <h3 className="mt-1.5 font-bold text-primary text-base leading-snug min-h-[3rem]">{p.title}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>}
          <span className="text-xl font-extrabold text-primary">{p.price}</span>
        </div>
        <a
          href={wa(p.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-bold text-whatsapp-foreground hover:scale-[1.02] hover:shadow-whatsapp-glow transition-all"
        >
          <MessageCircle className="h-4 w-4" /> Comprar via WhatsApp
        </a>
      </div>
    </motion.article>
  );
}

function Catalog() {
  const [activeTab, setActiveTab] = useState("todos");

  const filtered = activeTab === "todos"
    ? products
    : activeTab === "combos"
    ? products.filter((p) => p.category.toLowerCase().includes("combo"))
    : products.filter((p) =>
        p.category.toLowerCase().includes("kit") ||
        p.category.toLowerCase().includes("dispenser") ||
        p.category.toLowerCase().includes("atacado") ||
        p.category.toLowerCase().includes("álbum")
      );

  return (
    <section id="kits" className="py-20 lg:py-28 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
            Catálogo
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Escolha o kit ideal para sua coleção
          </h2>
          <p className="mt-4 text-muted-foreground">
            Combos com álbum, kits avulsos e caixas fechadas. Tudo conferido e enviado com cuidado.
          </p>
        </FadeIn>

        <div className="mt-10 flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border border-border shadow-sm">
              <TabsTrigger value="todos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Todos</TabsTrigger>
              <TabsTrigger value="kits" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Kits</TabsTrigger>
              <TabsTrigger value="combos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Combos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------ How It Works ------------------ */
function HowItWorks() {
  const steps = [
    { icon: MousePointerClick, title: "Escolha", desc: "Selecione o kit desejado." },
    { icon: PhoneCall, title: "Chame", desc: "O WhatsApp abre automaticamente." },
    { icon: CheckCircle2, title: "Confirme", desc: "Atendimento informa estoque e prazo." },
    { icon: Truck, title: "Receba", desc: "Pedido enviado e acompanhado." },
  ];
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-section-dark relative overflow-hidden">
      <div className="absolute inset-0 stadium-lights opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold uppercase tracking-wider">
            Processo Simples
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Do clique ao <span className="text-gold-gradient">álbum na mão</span>
          </h2>
        </FadeIn>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 hover:border-gold/40 hover:bg-white/[0.08] transition-all h-full">
                <div className="absolute -top-3 -left-3 h-9 w-9 rounded-full bg-gold flex items-center justify-center text-primary font-extrabold text-sm shadow-gold-glow">
                  {i + 1}
                </div>
                <s.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ Benefits ------------------ */
function Benefits() {
  const items = [
    { icon: PackageCheck, title: "Kits fechados", desc: "Quantidades padronizadas para evoluir sua coleção com previsibilidade." },
    { icon: Sparkles, title: "Combos completos", desc: "Álbum + pacotes em um único pedido para começar do zero." },
    { icon: MessageCircle, title: "Atendimento direto", desc: "Falamos com você no WhatsApp do início ao envio." },
    { icon: ShieldCheck, title: "Compra conferida", desc: "Cada pedido é separado e revisado antes do envio." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Monte uma compra do <span className="text-gold-gradient">tamanho certo</span> para sua coleção
          </h2>
        </FadeIn>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <FadeIn key={it.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-white p-6 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg transition-all h-full">
                <div className="h-12 w-12 rounded-xl bg-gold/15 flex items-center justify-center">
                  <it.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ Reviews ------------------ */
function Reviews() {
  const reviews = [
    { name: "Carlos Mendes", initials: "CM", text: "Recebi tudo certinho e muito rápido. Embalagem caprichada, recomendo!" },
    { name: "Juliana Ribeiro", initials: "JR", text: "Excelente atendimento e produtos originais. Voltarei a comprar com certeza." },
    { name: "Pedro Henrique", initials: "PH", text: "Perfeito para quem quer completar o álbum. Combo veio completo." },
  ];
  return (
    <section id="avaliacoes" className="py-20 lg:py-28 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
            Avaliações
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Colecionadores que confiam na <span className="text-gold-gradient">SuperAlbum</span>
          </h2>
        </FadeIn>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.1}>
              <div className="rounded-2xl bg-white border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-foreground leading-relaxed">"{r.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-primary text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Cliente verificado</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ FAQ ------------------ */
function FAQ() {
  const faqs = [
    { q: "Os produtos são originais?", a: "Sim, todos os produtos são originais e lacrados, direto do distribuidor oficial." },
    { q: "Vocês enviam para todo o Brasil?", a: "Sim, enviamos para todas as regiões do Brasil com rastreamento." },
    { q: "Como funciona a compra?", a: "Todo o atendimento ocorre pelo WhatsApp. Você escolhe, confirma com o atendente e faz o pagamento." },
    { q: "Posso comprar apenas figurinhas?", a: "Sim, oferecemos kits avulsos a partir de 25 pacotes, sem precisar do álbum." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="suporte" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">Perguntas frequentes</h2>
          <p className="mt-4 text-muted-foreground">Tudo o que você precisa saber antes de comprar.</p>
        </FadeIn>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <FadeIn key={f.q} delay={i * 0.05}>
                <div className="rounded-xl border border-border bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted transition-colors"
                  >
                    <span className="font-semibold text-primary">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
                    <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{f.a}</div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------ CTA Banner ------------------ */
function FinalCTA() {
  return (
    <section className="py-16 bg-section-dark relative overflow-hidden">
      <div className="absolute inset-0 stadium-lights opacity-60" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pronto para completar seu <span className="text-gold-gradient">álbum da Copa 2026?</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Fale agora com nosso atendimento e receba seu kit em casa.
          </p>
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-bold text-whatsapp-foreground hover:scale-105 hover:shadow-whatsapp-glow transition-all"
          >
            <MessageCircle className="h-5 w-5" /> Comprar pelo WhatsApp
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------ Footer ------------------ */
function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gold flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display font-extrabold text-white text-lg">Gol<span className="text-gold">Coleção</span></span>
          </div>
          <p className="mt-4 text-sm max-w-md">
            Sua loja especializada em figurinhas e álbuns oficiais da Copa do Mundo 2026. Atendimento humano via WhatsApp.
          </p>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-whatsapp-foreground hover:shadow-whatsapp-glow transition-all">
            <MessageCircle className="h-4 w-4" /> Fale conosco
          </a>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gold transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a></li>
            <li><a href="#suporte" className="hover:text-gold transition-colors">Suporte</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Siga-nos</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full bg-white/5 hover:bg-gold hover:text-primary flex items-center justify-center transition-all"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full bg-white/5 hover:bg-gold hover:text-primary flex items-center justify-center transition-all"><Facebook className="h-4 w-4" /></a>
            <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full bg-whatsapp hover:scale-110 text-white flex items-center justify-center transition-all"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} SuperAlbum. Todos os direitos reservados. Não afiliado à FIFA ou Panini.
        </div>
      </div>
    </footer>
  );
}

/* ------------------ Floating WhatsApp ------------------ */
function FloatingWA() {
  return (
    <a
      href={wa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Comprar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-whatsapp flex items-center justify-center text-white shadow-whatsapp-glow hover:scale-110 transition-transform animate-pulse"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Catalog />
        <HowItWorks />
        <Benefits />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
