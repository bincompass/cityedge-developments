export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "سيتي إيدج للتطوير العقاري",
    alternateName: "City Edge Developments",
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logos/main-logo.svg`,
    description:
      "سيتي إيدج للتطوير العقاري هي المطور العقاري الوطني لمشروعات سكنية وتجارية وإدارية متميزة في مصر.",
    foundingDate: "2017",
    sameAs: [
      "https://www.facebook.com/cityedgedevelopments",
      "https://www.instagram.com/cityedgedevelopments",
      "https://www.linkedin.com/company/city-edge-developments",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressRegion: "Cairo",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "سيتي إيدج للتطوير العقاري",
    url: baseUrl,
    description: "المطور العقاري الوطني في مصر",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "سيتي إيدج للتطوير العقاري",
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logos/main-logo.svg`,
    description:
      "شركة رائدة في التطوير العقاري في العلمين الجديدة والقاهرة الجديدة والشيخ زايد والمنصورة الجديدة",
    areaServed: [
      {
        "@type": "City",
        name: "العلمين الجديدة",
      },
      {
        "@type": "City",
        name: "القاهرة الجديدة",
      },
      {
        "@type": "City",
        name: "الشيخ زايد",
      },
      {
        "@type": "City",
        name: "المنصورة الجديدة",
      },
      {
        "@type": "City",
        name: "العاصمة الإدارية الجديدة",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "من نحن",
        item: `${baseUrl}/#about-us`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "مشاريعنا",
        item: `${baseUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "العقارات",
        item: `${baseUrl}/#properties`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
