#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador estático do site da Material de Construção Coragem.
Sem dependências externas (sem npm) — HTML puro, rápido, cada página com
title/description únicos e dados estruturados (JSON-LD LocalBusiness).
"""
import os
import json
import sys

# Gera direto em site/ (a pasta que a Vercel publica). CSS, JS, logo e
# favicons vivem em site/assets/ e são editados lá — este script só monta
# o HTML, o robots.txt e o sitemap.xml.
# Uso: python build.py            -> escreve em site/
#      python build.py <pasta>    -> escreve em outra pasta (pra comparar)
OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")

SITE_NAME = "Material De Construção Coragem"
PHONE_DISPLAY = "(21) 98169-1223"
PHONE_TEL = "+5521981691223"
WHATSAPP_NUMBER = "5521981691223"
ADDRESS_LINE = "Rua do Sulista, 803-805"
ADDRESS_FULL = "Rua do Sulista, 803-805 - Campo Grande, Rio de Janeiro - RJ, CEP 23098-630"
MAPS_LINK = "https://maps.app.goo.gl/gFBnswycrDKVBB3N8"
REVIEW_LINK = "https://g.page/r/CRYXDoMz4K8HEBM/review"
HOURS_WEEK = "Seg a Sex: 7h às 18h"
HOURS_SAT = "Sáb: 7h às 16h"
INSTAGRAM = "https://www.instagram.com/material_coragem/"
FACEBOOK = "https://www.facebook.com/61558025887908"
SITE_DOMAIN = "https://coragemabr.com.br"  # domínio configurado na Vercel (sem www)

NEIGHBORHOODS = ["Campo Grande", "Mendanha", "Carobinha", "Bangu", "Santíssimo", "Cosmos", "Inhoaíba", "Senador Camará"]

CATEGORIES = [
    {
        "slug": "materiais-basicos",
        "name": "Materiais Básicos",
        "desc": "Cimento CP II e CP III, areia, brita, tijolos e blocos prontos pra entrega ou retirada.",
        "icon": "cube",
    },
    {
        "slug": "tintas-e-pintura",
        "name": "Tintas e Pintura",
        "desc": "Tintas, vernizes, solventes e acessórios de pintura para dentro e fora de casa.",
        "icon": "roller",
    },
    {
        "slug": "hidraulica",
        "name": "Hidráulica",
        "desc": "Tubos, conexões, torneiras e registros para instalação e reforma hidráulica.",
        "icon": "drop",
    },
    {
        "slug": "eletrica",
        "name": "Elétrica",
        "desc": "Fios, cabos, tomadas e disjuntores para instalações residenciais e comerciais.",
        "icon": "bolt",
    },
    {
        "slug": "ferramentas",
        "name": "Ferramentas",
        "desc": "Ferramentas manuais e elétricas para o dia a dia da obra e pequenos reparos.",
        "icon": "wrench",
    },
    {
        "slug": "acabamentos",
        "name": "Acabamentos",
        "desc": "Pisos, revestimentos e louças para fechar a obra com qualidade.",
        "icon": "layers",
    },
]

FAQ = [
    ("Quantos sacos de cimento preciso para uma laje?",
     "Depende da espessura da laje e do tipo de concreto. Como referência geral, uma laje de concreto de 10cm consome em média 7 a 8 sacos de cimento de 50kg por m³. Pra não errar na conta, manda as medidas da sua obra no WhatsApp que a gente calcula certinho."),
    ("Qual a diferença entre areia fina e areia grossa?",
     "A areia fina (ou média) é usada em reboco, chapisco e acabamento. A areia grossa é usada em concreto e alvenaria, onde precisa de mais resistência. Usar a areia errada compromete o acabamento ou a resistência da obra."),
    ("Qual telha usar na minha obra?",
     "Depende do clima, da inclinação do telhado e do orçamento: telha cerâmica é mais barata e tradicional, telha de fibrocimento é mais leve e rápida de instalar, telha metálica é mais durável mas custa mais. Traga o projeto do telhado que a gente indica a melhor opção."),
    ("Quanto material preciso para construir um muro?",
     "Varia com a altura, comprimento e tipo de tijolo/bloco. Como referência, um muro de bloco de concreto usa cerca de 12,5 blocos por m². Manda as medidas (comprimento x altura) que fazemos o cálculo certo pra você."),
    ("Cimento CP II ou CP III?",
     "CP II é o mais usado no dia a dia — alvenaria, reboco, contrapiso. CP III tem maior resistência química e menor calor de hidratação, mais indicado para fundações, obras de grande volume de concreto ou em contato com solo/água agressivos. Na dúvida, CP II atende a maioria das reformas residenciais."),
    ("Como pedir um orçamento na Coragem?",
     "É só mandar sua lista de materiais (ou foto dela) pelo WhatsApp " + PHONE_DISPLAY + ", informar o bairro de entrega e se prefere receber em casa ou retirar na loja. Respondemos em até 24h úteis."),
]

# ---------------------------------------------------------------- icons ----
ICONS = {
    "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    "pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    "clock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    "whatsapp": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.28-.14-1.67-.82-1.93-.92-.26-.1-.45-.14-.64.14-.2.28-.74.92-.9 1.1-.17.2-.33.22-.61.08-.28-.14-1.19-.44-2.26-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.18-.28.28-.46.1-.2.05-.36-.02-.5-.07-.14-.64-1.54-.87-2.11-.23-.55-.47-.48-.64-.49h-.55c-.2 0-.5.07-.76.36-.26.28-1 1-1 2.4 0 1.42 1.02 2.79 1.16 2.98.14.2 2 3.05 4.86 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.67-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.2-.55-.34z"/><path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.6 1.44 5.1L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.1c-1.68 0-3.28-.45-4.66-1.28l-.33-.2-3 .79.8-2.93-.21-.3A8.1 8.1 0 1 1 20.1 12a8.1 8.1 0 0 1-8.08 8.1z"/></svg>',
    "check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    "truck": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    "shield": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    "users": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "menu": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    "close": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    "arrow": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    "instagram": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.34C16.2 4.3 15.2 4.2 14 4.2c-2.4 0-4 1.46-4 4.15V10.5H7.5v3H10V21h3.5z"/></svg>',
    "cube": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    "roller": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="14" height="6" rx="1"/><path d="M6 10v4"/><rect x="4" y="14" width="4" height="7" rx="1"/></svg>',
    "drop": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s7 7.58 7 12a7 7 0 0 1-14 0c0-4.42 7-12 7-12z"/></svg>',
    "bolt": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    "wrench": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 1 0-5.66 5.66l-6.36 6.36a1 1 0 0 0 1.41 1.41l6.36-6.36a4 4 0 0 0 5.66-5.66l-2.12 2.12-2.12-.7-.7-2.12z"/></svg>',
    "layers": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    "star": '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
}


def icon(name, cls=""):
    svg = ICONS[name]
    if cls:
        svg = svg.replace("<svg ", '<svg class="%s" ' % cls, 1)
    return svg


def stars_html(n=5):
    return icon("star") * n


# --------------------------------------------------------------- header ----
def nav_links(active=""):
    items = [
        ("index.html", "Início"),
        ("produtos.html", "Produtos"),
        ("quem-somos.html", "Quem Somos"),
        ("entrega.html", "Entrega"),
        ("material-de-construcao-mendanha-campo-grande.html", "Atendemos sua região"),
        ("contato.html", "Contato"),
    ]
    out = []
    for href, label in items:
        cls = "active" if href == active else ""
        out.append('<a href="%s" data-nav-link class="%s">%s</a>' % (href, cls, label))
    return "\n".join(out)


def logo_img(cls):
    return ('<img class="%s" src="assets/logo-coragem.png" alt="%s" width="388" height="166">'
            % (cls, SITE_NAME))


def render_header(active=""):
    return """
<div class="top-strip">
  <div class="container">
    <span class="top-item">%(pin)s %(addr)s</span>
    <span class="top-item">%(clock)s %(hours)s &middot; %(hours_sat)s</span>
    <a class="top-item" href="tel:%(tel)s">%(phone)s %(phone_disp)s</a>
  </div>
</div>
<header class="site-header" data-site-header>
  <div class="container">
    <a href="index.html" class="brand" aria-label="%(name)s — início">
      %(logo)s
    </a>
    <nav class="main-nav">
      %(links)s
    </nav>
    <div class="header-cta">
      <div class="header-phone">
        <span>Orçamento rápido</span>
        <strong>%(phone_disp)s</strong>
      </div>
      <a class="btn btn-primary" data-wa-message="Olá! Vim pelo site e gostaria de um orçamento." href="#">%(wa)s Pedir no WhatsApp</a>
      <button class="nav-toggle" data-nav-toggle aria-label="Abrir menu" aria-controls="mobile-nav">%(menu)s</button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" data-mobile-nav>
  <div class="mobile-nav-top">
    <span class="brand">%(logo)s</span>
    <button class="mobile-nav-close" data-nav-close aria-label="Fechar menu">%(close)s</button>
  </div>
  %(links)s
  <a class="btn btn-primary btn-block" data-wa-message="Olá! Vim pelo site e gostaria de um orçamento." href="#">%(wa)s Pedir no WhatsApp</a>
</div>
""" % {
        "pin": icon("pin"), "clock": icon("clock"), "phone": icon("phone"),
        "menu": icon("menu"), "close": icon("close"), "wa": icon("whatsapp"),
        "addr": ADDRESS_LINE, "hours": HOURS_WEEK, "hours_sat": HOURS_SAT,
        "tel": PHONE_TEL, "phone_disp": PHONE_DISPLAY, "name": SITE_NAME,
        "links": nav_links(active), "logo": logo_img("brand-logo"),
    }


def render_footer():
    cat_links = "\n".join(
        '<li><a href="produtos.html#%s">%s</a></li>' % (c["slug"], c["name"]) for c in CATEGORIES
    )
    return """
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="brand">%(logo)s</a>
        <p>Há mais de 25 anos vendendo material de construção em Campo Grande, Mendanha e região com preço justo e entrega rápida.</p>
        <div class="footer-social">
          <a href="%(insta)s" target="_blank" rel="noopener" aria-label="Instagram">%(ig)s</a>
          <a href="%(fb)s" target="_blank" rel="noopener" aria-label="Facebook">%(fbicon)s</a>
          <a href="#" data-wa-message="Olá! Vim pelo site e gostaria de um orçamento." target="_blank" rel="noopener" aria-label="WhatsApp">%(wa)s</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Produtos</h4>
        <ul>%(cats)s</ul>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <ul>
          <li><a href="quem-somos.html">Quem Somos</a></li>
          <li><a href="entrega.html">Área de entrega</a></li>
          <li><a href="orcamento.html">Pedir orçamento</a></li>
          <li><a href="material-de-construcao-mendanha-campo-grande.html">Atendemos sua região</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <ul>
          <li class="muted">%(addr_full)s</li>
          <li><a href="tel:%(tel)s">%(phone_disp)s</a></li>
          <li class="muted">%(hours)s</li>
          <li class="muted">%(hours_sat)s</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year></span> %(name)s. Todos os direitos reservados.</span>
      <span>Rio de Janeiro, RJ</span>
    </div>
  </div>
</footer>
<a class="wa-float" data-wa-message="Olá! Vim pelo site e gostaria de um orçamento." href="#" target="_blank" rel="noopener" aria-label="Fale no WhatsApp">%(wa)s</a>
<script>document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear();});</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.js" defer></script>
<script src="assets/script.js" defer></script>
""" % {
        "logo": logo_img("brand-logo brand-logo-lg"), "name": SITE_NAME, "insta": INSTAGRAM, "fb": FACEBOOK,
        "ig": icon("instagram"), "fbicon": icon("facebook"), "wa": icon("whatsapp"),
        "cats": cat_links, "addr_full": ADDRESS_FULL, "tel": PHONE_TEL,
        "phone_disp": PHONE_DISPLAY, "hours": HOURS_WEEK, "hours_sat": HOURS_SAT,
    }


def local_business_jsonld():
    # Mesmos dados do Perfil da Empresa no Google — igual em todas as páginas.
    data = {
        "@context": "https://schema.org",
        "@type": "HardwareStore",
        "name": SITE_NAME,
        "url": SITE_DOMAIN,
        "telephone": PHONE_TEL,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": ADDRESS_LINE,
            "addressLocality": "Campo Grande, Rio de Janeiro",
            "addressRegion": "RJ",
            "postalCode": "23098-630",
            "addressCountry": "BR",
        },
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "07:00", "closes": "18:00"},
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "07:00", "closes": "16:00"},
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "49",
        },
        "sameAs": [INSTAGRAM, FACEBOOK],
        "areaServed": NEIGHBORHOODS,
    }
    return '\n<script type="application/ld+json">\n%s\n</script>\n' % json.dumps(data, ensure_ascii=False, indent=2)


def page_url(path):
    # A Vercel está com cleanUrls: /produtos.html redireciona (308) para
    # /produtos e /index.html para /. Canonical, og:url e sitemap usam a
    # URL final, senão o Google trata a página como redirecionamento.
    slug = path[:-len(".html")] if path.endswith(".html") else path
    return SITE_DOMAIN + "/" + ("" if slug == "index" else slug)


def page_shell(title, description, path, body, active="", extra_head=""):
    url = page_url(path)
    return """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(url)s">
<meta property="og:type" content="website">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:url" content="%(url)s">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@118,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0a1628">
<script>(function(r){r.classList.add("reveal");setTimeout(function(){if(!r.classList.contains("reveal-live"))r.classList.remove("reveal")},2500)})(document.documentElement);</script>
%(jsonld)s
%(extra_head)s
</head>
<body>
%(header)s
<main>
%(body)s
</main>
%(footer)s
</body>
</html>
""" % {
        "title": title, "desc": description, "url": url,
        "jsonld": local_business_jsonld(),
        "extra_head": extra_head,
        "header": render_header(active),
        "body": body,
        "footer": render_footer(),
    }


# ------------------------------------------------------------- fragments ---
def trust_badges():
    items = [
        ("shield", "Há mais de 25 anos", "Servindo Campo Grande e região"),
        ("truck", "Entrega em até 48h", "Frota própria, sem surpresa"),
        ("check", "Preço justo", "Consulta rápida pelo WhatsApp"),
        ("users", "Atendimento próximo", "Você fala direto com quem resolve"),
    ]
    cards = ""
    for ic, title, sub in items:
        cards += """
        <li class="feature-item">
          <span class="ico">%s</span>
          <div><strong>%s</strong><p>%s</p></div>
        </li>""" % (icon(ic), title, sub)
    return cards


def category_grid(with_wa_links=True):
    cards = ""
    for c in CATEGORIES:
        link = ('<a class="cat-link" href="#" data-wa-message="Olá! Gostaria de um orçamento de %s." id="%s">Pedir orçamento %s</a>'
                % (c["name"], c["slug"], icon("arrow")))
        cards += """
        <div class="cat-card" id="%s">
          <span class="cat-icon">%s</span>
          <h3>%s</h3>
          <p>%s</p>
          %s
        </div>""" % (c["slug"], icon(c["icon"]), c["name"], c["desc"], link if with_wa_links else "")
    return '<div class="grid">%s</div>' % cards


def neighborhood_chips():
    return " ".join('<span class="chip">%s</span>' % n for n in NEIGHBORHOODS)


def review_banner():
    return """
<div class="review-banner">
  <div class="review-score">
    <div class="num">4,6</div>
    <div class="stars">%s</div>
    <div class="count">49 avaliações</div>
  </div>
  <p>Nota real do Google, sem depoimento inventado — confira as avaliações de quem já comprou na Coragem.</p>
  <a class="btn btn-outline-dark" href="%s" target="_blank" rel="noopener">Ver avaliações no Google</a>
</div>
""" % (stars_html(), MAPS_LINK)


def faq_block(items=None):
    items = items or FAQ
    out = ""
    for q, a in items:
        out += """
      <details class="faq-item">
        <summary>%s <span class="plus">+</span></summary>
        <p>%s</p>
      </details>""" % (q, a)
    return out


def map_embed():
    # O iframe do Google Maps (~450 KiB) só carrega quando a pessoa clica em
    # "Carregar mapa" (ver initMapFacade em script.js). Sem JS, o <noscript>
    # mostra o mapa direto.
    q = ADDRESS_FULL.replace(" ", "+").replace(",", "%2C")
    src = "https://www.google.com/maps?q=%s&output=embed" % q
    title = "Localização da Coragem"
    return """<div class="map-wrap" data-map-src="%(src)s" data-map-title="%(title)s">
      <div class="map-cover map-art" aria-hidden="true"></div>
      <div class="map-cover map-card">
        <span class="map-pin">%(pin)s</span>
        <strong>%(addr)s</strong>
        <span>Campo Grande, Rio de Janeiro - RJ</span>
        <div class="map-actions">
          <button type="button" class="btn btn-primary" data-map-load>Carregar mapa</button>
          <a class="btn btn-ghost" href="%(maps)s" target="_blank" rel="noopener">Abrir no Google Maps</a>
        </div>
      </div>
      <noscript><iframe src="%(src)s" loading="lazy" title="%(title)s"></iframe></noscript>
    </div>""" % {"src": src, "title": title, "pin": icon("pin"), "addr": ADDRESS_LINE, "maps": MAPS_LINK}


os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "assets"), exist_ok=True)


def write(path, html):
    with open(os.path.join(OUT_DIR, path), "w", encoding="utf-8") as f:
        f.write(html)
    print("  ->", path)


# ================================================================
# HOME
# ================================================================
def page_home():
    body = """
<section class="hero">
  <div class="container">
    <div>
      <span class="hero-badge"><span class="dot"></span> Há mais de 25 anos em Campo Grande</span>
      <h1>Material de construção com <span>entrega rápida</span> e preço justo</h1>
      <p class="lead">Cimento, areia, tintas, hidráulica, elétrica e ferramentas para sua obra ou reforma. Atendemos Campo Grande, Mendanha, Carobinha e região.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="orcamento.html">%(arrow_none)sPedir orçamento</a>
        <a class="btn btn-outline btn-lg" data-wa-message="Olá! Vim pelo site e gostaria de um orçamento." href="#" target="_blank" rel="noopener">%(wa)s Chamar no WhatsApp</a>
      </div>
      <ul class="hero-trust">
        <li>%(check)s Entrega em Campo Grande, Bangu e região</li>
        <li>%(check)s Retirada na loja com estacionamento</li>
        <li>%(check)s Atendimento de segunda a sábado</li>
      </ul>
    </div>
    <div class="hero-panel">
      <div class="hero-rating">
        <div class="score">4,6</div>
        <div>
          <div class="stars">%(stars)s</div>
          <div class="meta">49 avaliações reais no Google</div>
        </div>
      </div>
      <div class="hero-panel-list">
        <div class="hero-panel-item">%(pin)s<div><strong>%(addr)s</strong>Campo Grande, Rio de Janeiro - RJ</div></div>
        <div class="hero-panel-item">%(clock)s<div><strong>%(hours)s</strong>%(hours_sat)s</div></div>
        <div class="hero-panel-item">%(phone)s<div><strong>%(phone_disp)s</strong>Resposta em até 24h úteis</div></div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <ul class="feature-list feature-strip">
      %(trust)s
    </ul>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Nossos produtos</span>
      <h2>Tudo para construir ou reformar</h2>
      <p>Trabalhamos com as principais categorias de materiais de construção, com preço sob consulta pelo WhatsApp.</p>
    </div>
    %(cats)s
  </div>
</section>

<section class="section">
  <div class="container two-col">
    <div>
      <span class="eyebrow">Onde estamos</span>
      <h2>Atendemos Campo Grande, Mendanha e Carobinha</h2>
      <p>A Material de Construção Coragem atende o Mendanha, Campo Grande e a Carobinha há mais de 25 anos, com cimento, areia, tintas, material hidráulico e elétrico para obra e reforma. Faça seu orçamento pelo WhatsApp e receba em casa ou retire na loja, na %(addr)s.</p>
      <div class="chip-row">%(chips)s</div>
      <a class="btn btn-outline-dark" style="margin-top:24px" href="material-de-construcao-mendanha-campo-grande.html">Ver área de entrega completa %(arrow)s</a>
    </div>
    %(map)s
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Avaliações</span>
      <h2>O que dizem os clientes</h2>
    </div>
    %(reviews)s
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Dúvidas frequentes</span>
      <h2>Perguntas que a gente mais recebe</h2>
    </div>
    <div style="max-width:760px;margin:0 auto;">
      %(faq)s
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-band">
      <div>
        <h2>Pronto para começar sua obra?</h2>
        <p>Monte sua lista de materiais e receba o orçamento pelo WhatsApp em poucos minutos.</p>
      </div>
      <a class="btn btn-primary btn-lg" href="orcamento.html">Pedir orçamento agora %(arrow)s</a>
    </div>
  </div>
</section>
""" % {
        "arrow_none": "", "wa": icon("whatsapp"), "check": icon("check"), "stars": stars_html(),
        "pin": icon("pin"), "clock": icon("clock"), "phone": icon("phone"),
        "addr": ADDRESS_LINE, "hours": HOURS_WEEK, "hours_sat": HOURS_SAT, "phone_disp": PHONE_DISPLAY,
        "trust": trust_badges(), "cats": category_grid(), "chips": neighborhood_chips(),
        "map": map_embed(), "reviews": review_banner(), "faq": faq_block(FAQ[:4]),
        "arrow": icon("arrow"),
    }
    return page_shell(
        "Coragem Material de Construção – Campo Grande RJ",
        "Há 25 anos vendendo material de construção em Campo Grande e Mendanha, RJ. Cimento, areia, tintas, hidráulica e mais. Orçamento pelo WhatsApp.",
        "index.html", body, active="index.html",
    )


# ================================================================
# PRODUTOS
# ================================================================
def page_produtos():
    body = """
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a><span>/</span>Produtos</div>
    <h1>Catálogo de materiais de construção</h1>
    <p>Cimento, areia, brita, tintas, hidráulica, elétrica, ferramentas e acabamento — consulte disponibilidade e preço pelo WhatsApp.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    %s
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    <div class="cta-band">
      <div>
        <h2>Não achou o que precisa?</h2>
        <p>Manda a lista completa da sua obra que a gente confirma tudo pra você.</p>
      </div>
      <a class="btn btn-primary btn-lg" href="orcamento.html">Montar minha lista %s</a>
    </div>
  </div>
</section>
""" % (category_grid(), icon("arrow"))
    return page_shell(
        "Coragem Campo Grande – Cimento, Tintas, Hidráulica e Ferramentas",
        "Catálogo completo de materiais de construção em Campo Grande RJ: cimento, areia, brita, tintas, hidráulica, elétrica, ferramentas e acabamento.",
        "produtos.html", body, active="produtos.html",
    )


# ================================================================
# QUEM SOMOS
# ================================================================
def page_quem_somos():
    body = """
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a><span>/</span>Quem Somos</div>
    <h1>25 anos ajudando obras a sair do papel</h1>
    <p>Uma loja de bairro que virou referência em material de construção em Campo Grande.</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div>
      <span class="eyebrow">Nossa história</span>
      <h2>Feita pra atender quem constrói perto de casa</h2>
      <p>A Material de Construção Coragem atende Campo Grande, Mendanha e Carobinha há mais de 25 anos. Ao longo desse tempo, crescemos junto com o bairro: hoje trabalhamos com materiais básicos, tintas, hidráulica, elétrica, ferramentas e acabamento, sempre com atendimento direto — sem enrolação.</p>
      <p>Nossa nota no Google (4,6 de 5, com 49 avaliações) reflete o que buscamos todos os dias: preço justo, entrega no prazo combinado e alguém que realmente entende de obra do outro lado do WhatsApp.</p>
      <div class="feature-list">
        %s
      </div>
    </div>
    <div class="info-card">
      <h3>Coragem em números</h3>
      <div class="divider"></div>
      <div class="feature-list">
        <div class="feature-item"><span class="ico">%s</span><div><strong>25+ anos</strong><p>de atendimento em Campo Grande</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>4,6 / 5</strong><p>nota média em 49 avaliações no Google</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>8 bairros</strong><p>atendidos com entrega própria</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>6 categorias</strong><p>de produtos para obra e reforma</p></div></div>
      </div>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    %s
  </div>
</section>
""" % (trust_badges(), icon("shield"), icon("star"), icon("truck"), icon("cube"), review_banner())
    return page_shell(
        "Coragem Material de Construção – Quem Somos, 25 anos em Campo Grande",
        "Desde os anos 2000 atendendo Campo Grande e região com materiais de construção de qualidade e atendimento próximo.",
        "quem-somos.html", body, active="quem-somos.html",
    )


# ================================================================
# ENTREGA
# ================================================================
# Cena vetorial do caminhão (entrega). Animada por initTruckScene em
# script.js: as classes tr-* e as coordenadas do SVG são usadas lá.
TRUCK_SCENE = """<section class="truck-section">
  <div class="truck-scene" data-truck-scene role="img" aria-label="Ilustração do caminhão da Coragem entregando areia, pedra e cimento na obra">
    <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <g class="tr-hills">
        <path d="M-100 240V150C-20 128 60 104 140 106C220 108 280 64 380 58C460 54 510 98 570 104C650 112 710 76 790 84C870 92 910 128 990 120C1070 112 1130 86 1300 104V240Z" fill="#10203a"/>
        <path d="M-100 240V196C40 176 140 168 260 178C380 188 460 160 580 164C700 168 780 190 900 182C1020 174 1120 160 1300 172V240Z" fill="#0e1c33"/>
      </g>
      <g fill="#132544">
        <path d="M600 256V214L632 192L664 214V256Z"/><rect x="672" y="222" width="54" height="34"/>
        <path d="M900 256V206L940 180L980 206V256Z"/><rect x="990" y="216" width="70" height="40"/><path d="M1070 256V222L1098 204L1126 222V256Z"/>
      </g>
      <g stroke="#2b4a7a" stroke-width="3" fill="none" stroke-linecap="round">
        <path d="M232 256V66M244 256V66M232 66H380M232 84L380 66M212 66H232"/>
        <path d="M232 96L244 116L232 136L244 156L232 176L244 196L232 216L244 236" stroke-width="1.5"/>
        <path d="M352 66V120" stroke-width="1.5"/><path d="M346 120H358"/>
      </g>
      <rect x="150" y="196" width="150" height="60" fill="#1c3358"/>
      <path d="M150 216H300M150 236H300M180 196V216M220 196V216M260 196V216M200 216V236M240 216V236M280 216V236M180 236V256M220 236V256M260 236V256" stroke="#10203a" stroke-width="2"/>
      <rect x="0" y="256" width="1200" height="84" fill="#141f33"/>
      <path d="M0 256H1200" stroke="#2b4a7a" stroke-width="2"/>
      <rect x="0" y="318" width="1200" height="22" fill="#0d1a2f"/>
      <g class="tr-dashes" fill="#fff212" opacity=".75">
        <rect x="-160" y="303" width="36" height="4" rx="2"/><rect x="-80" y="303" width="36" height="4" rx="2"/><rect x="0" y="303" width="36" height="4" rx="2"/><rect x="80" y="303" width="36" height="4" rx="2"/><rect x="160" y="303" width="36" height="4" rx="2"/><rect x="240" y="303" width="36" height="4" rx="2"/><rect x="320" y="303" width="36" height="4" rx="2"/><rect x="400" y="303" width="36" height="4" rx="2"/><rect x="480" y="303" width="36" height="4" rx="2"/><rect x="560" y="303" width="36" height="4" rx="2"/><rect x="640" y="303" width="36" height="4" rx="2"/><rect x="720" y="303" width="36" height="4" rx="2"/><rect x="800" y="303" width="36" height="4" rx="2"/><rect x="880" y="303" width="36" height="4" rx="2"/><rect x="960" y="303" width="36" height="4" rx="2"/><rect x="1040" y="303" width="36" height="4" rx="2"/><rect x="1120" y="303" width="36" height="4" rx="2"/><rect x="1200" y="303" width="36" height="4" rx="2"/><rect x="1280" y="303" width="36" height="4" rx="2"/>
      </g>
      <g data-ground transform="translate(0 -18)">
      <g class="tr-pile">
        <path d="M372 292Q396 262 416 248Q431 239 446 248Q464 262 480 292Z" fill="#d9b26f"/>
        <path d="M431 243Q446 248 458 262Q468 276 480 292H446Q444 268 431 243Z" fill="#c29b58"/>
      </g>
      <g>
        <ellipse class="tr-stone" cx="318" cy="285" rx="8.5" ry="7" fill="#8b94a3"/><ellipse class="tr-stone" cx="334" cy="285" rx="8.5" ry="7" fill="#a3acb9"/><ellipse class="tr-stone" cx="350" cy="285" rx="8.5" ry="7" fill="#7d8697"/><ellipse class="tr-stone" cx="366" cy="285" rx="8.5" ry="7" fill="#98a1af"/>
        <ellipse class="tr-stone" cx="326" cy="272" rx="8.5" ry="7" fill="#a3acb9"/><ellipse class="tr-stone" cx="342" cy="272" rx="8.5" ry="7" fill="#8b94a3"/><ellipse class="tr-stone" cx="358" cy="272" rx="8.5" ry="7" fill="#a9b1bd"/>
        <ellipse class="tr-stone" cx="334" cy="259" rx="8.5" ry="7" fill="#7d8697"/><ellipse class="tr-stone" cx="350" cy="259" rx="8.5" ry="7" fill="#98a1af"/>
        <ellipse class="tr-stone" cx="342" cy="246" rx="8.5" ry="7" fill="#a3acb9"/>
      </g>
      <g fill="#e3c07e">
        <circle class="tr-sand-drop" cx="440" cy="206" r="3.5" opacity="0"/><circle class="tr-sand-drop" cx="448" cy="210" r="2.5" opacity="0"/><circle class="tr-sand-drop" cx="444" cy="216" r="3" opacity="0"/><circle class="tr-sand-drop" cx="452" cy="204" r="2.5" opacity="0"/><circle class="tr-sand-drop" cx="436" cy="214" r="2.5" opacity="0"/><circle class="tr-sand-drop" cx="446" cy="222" r="3.5" opacity="0"/><circle class="tr-sand-drop" cx="440" cy="226" r="2.5" opacity="0"/><circle class="tr-sand-drop" cx="454" cy="214" r="3" opacity="0"/><circle class="tr-sand-drop" cx="438" cy="200" r="2" opacity="0"/><circle class="tr-sand-drop" cx="450" cy="226" r="2.5" opacity="0"/>
      </g>
      <g fill="#9aa4b5">
        <g class="tr-dust-land" opacity="0"><circle cx="390" cy="282" r="12"/><circle cx="404" cy="276" r="9"/></g>
        <g class="tr-dust-land" opacity="0"><circle cx="440" cy="280" r="13"/><circle cx="456" cy="284" r="9"/></g>
        <g class="tr-dust-land" opacity="0"><circle cx="330" cy="280" r="11"/><circle cx="316" cy="286" r="8"/></g>
        <g class="tr-dust-drive" data-x="80" opacity="0"><circle cx="80" cy="284" r="11"/><circle cx="66" cy="288" r="7"/><circle cx="92" cy="288" r="6"/></g>
        <g class="tr-dust-drive" data-x="190" opacity="0"><circle cx="190" cy="284" r="11"/><circle cx="176" cy="288" r="7"/><circle cx="202" cy="288" r="6"/></g>
        <g class="tr-dust-drive" data-x="290" opacity="0"><circle cx="290" cy="284" r="11"/><circle cx="276" cy="288" r="7"/><circle cx="302" cy="288" r="6"/></g>
        <g class="tr-dust-drive" data-x="370" opacity="0"><circle cx="370" cy="284" r="10"/><circle cx="356" cy="288" r="7"/></g>
        <g class="tr-dust-drive" data-x="430" opacity="0"><circle cx="430" cy="286" r="8"/><circle cx="418" cy="289" r="6"/></g>
      </g>
      </g>
      <g class="tr-truck">
        <rect x="462" y="236" width="368" height="16" rx="3" fill="#2b3a52"/>
        <rect x="698" y="146" width="6" height="64" rx="2" fill="#8a94a6"/>
        <g class="tr-bed">
          <path d="M464 178H704V238H478Z" fill="#d8dde5"/>
          <path d="M506 184V236M546 184V236M586 184V236M626 184V236M666 184V236" stroke="#b8c0cc" stroke-width="3"/>
          <path class="tr-load" d="M470 176Q520 140 574 144Q610 140 634 150V176Z" fill="#d9b26f"/>
          <g fill="#8b94a3"><circle cx="560" cy="150" r="4"/><circle cx="592" cy="147" r="3.5"/><circle cx="612" cy="152" r="4"/></g>
          <rect x="460" y="174" width="248" height="9" rx="2" fill="#eef1f4"/>
          <rect x="640" y="158" width="30" height="16" rx="3" fill="#efe9dc"/><rect x="672" y="158" width="30" height="16" rx="3" fill="#e6dfcf"/><rect x="656" y="142" width="30" height="16" rx="3" fill="#efe9dc"/>
          <path d="M640 166H670M672 166H702M656 150H686" stroke="#0a1628" stroke-width="3"/>
        </g>
        <path d="M706 252V180Q706 168 718 168H792L828 210V252Z" fill="#fff212"/>
        <path d="M722 180H786L810 208H722Z" fill="#0a1628" opacity=".88"/>
        <path d="M730 186H760" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
        <rect x="706" y="222" width="122" height="7" fill="#0a1628"/>
        <path d="M752 212V250" stroke="#0a1628" stroke-opacity=".3" stroke-width="2"/>
        <rect x="820" y="214" width="9" height="8" rx="2" fill="#fff"/>
        <rect x="822" y="234" width="14" height="16" rx="3" fill="#c9cfd8"/>
        <g data-ground transform="translate(0 -18)">
          <g class="tr-wheel"><circle cx="520" cy="270" r="22" fill="#070b12"/><circle cx="520" cy="270" r="11" fill="#c9cfd8"/><path d="M509 270H531M520 259V281" stroke="#0a1628" stroke-width="3"/><circle cx="520" cy="270" r="3.5" fill="#0a1628"/></g>
        <g class="tr-wheel"><circle cx="572" cy="270" r="22" fill="#070b12"/><circle cx="572" cy="270" r="11" fill="#c9cfd8"/><path d="M561 270H583M572 259V281" stroke="#0a1628" stroke-width="3"/><circle cx="572" cy="270" r="3.5" fill="#0a1628"/></g>
        <g class="tr-wheel"><circle cx="776" cy="270" r="22" fill="#070b12"/><circle cx="776" cy="270" r="11" fill="#c9cfd8"/><path d="M765 270H787M776 259V281" stroke="#0a1628" stroke-width="3"/><circle cx="776" cy="270" r="3.5" fill="#0a1628"/></g>
        </g>
      </g>
    </svg>
  </div>
</section>
"""


def page_entrega():
    body = """
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a><span>/</span>Entrega</div>
    <h1>Entregamos em Campo Grande, Bangu e região</h1>
    <p>Frota própria, prazo combinado e a opção de retirar na loja quando for mais rápido pra você.</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div>
      <span class="eyebrow">Como funciona</span>
      <h2>Peça sua lista, a gente leva até você</h2>
      <p>Manda a lista de materiais (ou uma foto dela) pelo WhatsApp, confirma o bairro e escolhe entre receber em casa em até 48h ou retirar direto na loja, com estacionamento gratuito.</p>
      <div class="feature-list">
        <div class="feature-item"><span class="ico">%s</span><div><strong>Entrega em até 48h</strong><p>Frota própria, sem depender de terceiros</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>Retirada na loja</strong><p>Com estacionamento gratuito na %s</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>Preço justo por bairro</strong><p>Consulte o frete na hora do orçamento</p></div></div>
      </div>
      <a class="btn btn-primary" style="margin-top:26px" data-wa-message="Olá! Gostaria de saber o prazo de entrega para o meu bairro." href="#" target="_blank" rel="noopener">%s Consultar prazo pelo WhatsApp</a>
    </div>
    <div class="info-card">
      <h3>Bairros atendidos</h3>
      <div class="divider"></div>
      <div class="chip-row">%s</div>
      <p class="small" style="margin-top:18px">Bairro fora da lista? Chama no WhatsApp — muitas vezes conseguimos entregar mesmo assim.</p>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    %s
  </div>
</section>
""" % (icon("truck"), icon("shield"), ADDRESS_LINE, icon("check"), icon("whatsapp"), neighborhood_chips(), map_embed())
    # O caminhão entra entre "Como funciona" e o mapa.
    body = body.replace('<section class="section section-alt">', TRUCK_SCENE + '<section class="section section-alt">', 1)
    return page_shell(
        "Coragem – Entrega de Material de Construção em Campo Grande e Bangu",
        "Entregamos em Campo Grande, Bangu, Santíssimo, Cosmos, Inhoaíba e Senador Camará em até 48h. Frota própria, preço justo.",
        "entrega.html", body, active="entrega.html",
    )


# ================================================================
# CONTATO
# ================================================================
def page_contato():
    body = """
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a><span>/</span>Contato</div>
    <h1>Fale com a Coragem</h1>
    <p>Telefone, WhatsApp e endereço da loja, na %s.</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div class="info-card">
      <h3>Dados de contato</h3>
      <div class="divider"></div>
      <div class="feature-list">
        <div class="feature-item"><span class="ico">%s</span><div><strong>%s</strong><p>%s</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>%s</strong><p>Ligação ou WhatsApp</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>%s</strong><p>%s</p></div></div>
      </div>
      <div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;">
        <a class="btn btn-primary" data-wa-message="Olá! Vim pelo site e gostaria de falar com a loja." href="#" target="_blank" rel="noopener">%s Chamar no WhatsApp</a>
        <a class="btn btn-outline-dark" href="tel:%s">%s Ligar agora</a>
      </div>
      <div class="footer-social" style="margin-top:22px;">
        <a href="%s" target="_blank" rel="noopener" aria-label="Instagram" style="background:#0b2b5c14">%s</a>
        <a href="%s" target="_blank" rel="noopener" aria-label="Facebook" style="background:#0b2b5c14">%s</a>
      </div>
    </div>
    %s
  </div>
</section>
""" % (
        ADDRESS_LINE, icon("pin"), ADDRESS_LINE, "Campo Grande, Rio de Janeiro - RJ, CEP 23098-630",
        icon("phone"), PHONE_DISPLAY, icon("clock"), HOURS_WEEK, HOURS_SAT,
        icon("whatsapp"), PHONE_TEL, icon("phone"),
        INSTAGRAM, icon("instagram"), FACEBOOK, icon("facebook"),
        map_embed(),
    )
    return page_shell(
        "Coragem Material de Construção Campo Grande RJ – Fale Conosco",
        "Telefone, WhatsApp e endereço da Coragem, na Rua do Sulista, Campo Grande RJ. Atendimento de segunda a sábado.",
        "contato.html", body, active="contato.html",
    )


# ================================================================
# ORÇAMENTO (formulário -> WhatsApp)
# ================================================================
def page_orcamento():
    cat_checks = "\n".join(
        '<label class="check-item"><input type="checkbox" name="categoria" value="%s"> %s</label>' % (c["name"], c["name"])
        for c in CATEGORIES
    )
    body = """
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a><span>/</span>Orçamento</div>
    <h1>Peça seu orçamento</h1>
    <p>Preencha os campos abaixo — ao enviar, o WhatsApp abre com sua mensagem pronta para a loja.</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <form class="quote-form" data-quote-form>
      <div class="field">
        <label for="f-nome">Seu nome</label>
        <input type="text" id="f-nome" name="nome" placeholder="Como podemos te chamar?">
      </div>
      <div class="field">
        <label for="f-bairro">Bairro para entrega ou retirada</label>
        <input type="text" id="f-bairro" name="bairro" placeholder="Ex.: Campo Grande, Mendanha...">
      </div>
      <div class="field">
        <label>O que você precisa? (opcional)</label>
        <div class="check-grid">%s</div>
      </div>
      <div class="field">
        <label for="f-detalhes">Detalhes da sua lista (opcional)</label>
        <textarea id="f-detalhes" name="detalhes" placeholder="Ex.: 20 sacos de cimento CP II, 5m³ de areia..."></textarea>
      </div>
      <div class="field">
        <label>Como prefere receber?</label>
        <div class="radio-row">
          <label class="radio-pill"><input type="radio" name="entrega" value="Entrega em casa" checked> Entrega em casa</label>
          <label class="radio-pill"><input type="radio" name="entrega" value="Retirada na loja"> Retirada na loja</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">%s Enviar pelo WhatsApp</button>
      <p class="form-note">Nada é enviado automaticamente — você confirma e envia a mensagem direto no seu WhatsApp.</p>
    </form>
    <div class="info-card">
      <h3>Prefere falar direto?</h3>
      <div class="divider"></div>
      <div class="feature-list">
        <div class="feature-item"><span class="ico">%s</span><div><strong>%s</strong><p>Resposta em até 24h úteis</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>%s</strong><p>%s</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>%s</strong><p>Estacionamento gratuito</p></div></div>
      </div>
      %s
    </div>
  </div>
</section>
""" % (
        cat_checks, icon("whatsapp"),
        icon("whatsapp"), PHONE_DISPLAY,
        icon("clock"), HOURS_WEEK, HOURS_SAT,
        icon("pin"), ADDRESS_LINE,
        faq_block(FAQ[-1:]),
    )
    return page_shell(
        "Coragem Material de Construção – Peça seu Orçamento",
        "Monte sua lista de materiais de construção e receba o orçamento da Coragem pelo WhatsApp em até 24h úteis.",
        "orcamento.html", body, active="orcamento.html",
    )


# ================================================================
# PÁGINA LOCAL SEO — Mendanha / Campo Grande / Carobinha
# ================================================================
def page_local_seo():
    keywords = ["material de construção Campo Grande RJ", "material de construção Mendanha",
                "material de construção Carobinha", "loja de material de construção Campo Grande",
                "cimento Campo Grande RJ", "material hidráulico Campo Grande", "material elétrico Campo Grande"]
    kw_html = " &middot; ".join(keywords)
    body = """
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a><span>/</span>Atendemos sua região</div>
    <h1>Material de construção no Mendanha, Campo Grande e Carobinha</h1>
    <p>Mais de 25 anos entregando cimento, areia, tintas e material hidráulico e elétrico para quem constrói perto de casa.</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div>
      <span class="eyebrow">Atendimento local</span>
      <h2>Quem procura material de construção no Mendanha e Campo Grande encontra a Coragem</h2>
      <p>A Material de Construção Coragem atende o Mendanha, Campo Grande e a Carobinha há mais de 25 anos, com cimento, areia, tintas, material hidráulico e elétrico para obra e reforma. Faça seu orçamento pelo WhatsApp e receba em casa ou retire na loja, na %s.</p>
      <p>Procurando <strong>cimento em Campo Grande RJ</strong>? Trabalhamos com cimento CP II e CP III, com preço justo e entrega rápida para toda a região. Consulte disponibilidade e faça seu orçamento pelo WhatsApp em poucos minutos.</p>
      <div class="chip-row">%s</div>
    </div>
    <div class="info-card">
      <h3>Bairros atendidos</h3>
      <div class="divider"></div>
      <div class="feature-list">
        <div class="feature-item"><span class="ico">%s</span><div><strong>Entrega própria</strong><p>Em até 48h para toda a região</p></div></div>
        <div class="feature-item"><span class="ico">%s</span><div><strong>Retirada na loja</strong><p>Na %s, com estacionamento</p></div></div>
      </div>
      <a class="btn btn-primary btn-block" style="margin-top:22px" data-wa-message="Olá! Vim pelo site e gostaria de um orçamento para o meu bairro." href="#" target="_blank" rel="noopener">%s Pedir orçamento</a>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Dúvidas de quem está construindo na região</span>
      <h2>Perguntas frequentes</h2>
    </div>
    <div style="max-width:760px;margin:0 auto;">
      %s
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    %s
    <p class="small text-center" style="margin-top:18px">%s</p>
  </div>
</section>
""" % (
        ADDRESS_LINE, neighborhood_chips(), icon("truck"), icon("pin"), ADDRESS_LINE, icon("whatsapp"),
        faq_block(FAQ), review_banner(), kw_html,
    )
    return page_shell(
        "Coragem Campo Grande – Material de Construção no Mendanha e Carobinha",
        "A Coragem atende Mendanha, Campo Grande e Carobinha há mais de 25 anos: cimento, areia, tintas, hidráulica e elétrica com entrega própria.",
        "material-de-construcao-mendanha-campo-grande.html", body,
        active="material-de-construcao-mendanha-campo-grande.html",
    )


PAGES = [
    page_home,
    page_produtos,
    page_quem_somos,
    page_entrega,
    page_contato,
    page_orcamento,
    page_local_seo,
]

FILE_NAMES = [
    "index.html", "produtos.html", "quem-somos.html", "entrega.html",
    "contato.html", "orcamento.html", "material-de-construcao-mendanha-campo-grande.html",
]

print("Gerando site...")
for fn, page_func in zip(FILE_NAMES, PAGES):
    write(fn, page_func())

# robots.txt + sitemap.xml
with open(os.path.join(OUT_DIR, "robots.txt"), "w") as f:
    f.write("User-agent: *\nAllow: /\nSitemap: %s/sitemap.xml\n" % SITE_DOMAIN)

sitemap_urls = "\n".join(
    "  <url><loc>%s</loc></url>" % page_url(fn) for fn in FILE_NAMES
)
with open(os.path.join(OUT_DIR, "sitemap.xml"), "w") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s\n</urlset>\n' % sitemap_urls)

print("Pronto! %d páginas geradas em %s" % (len(FILE_NAMES), OUT_DIR))
