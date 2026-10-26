/**
 * SnowyCare - Mascot Graphics Engine
 * Generates custom SVG vector illustrations of "Snowy the Ice Bear" 🐻‍❄️❄️
 */

function getBearSvg(variant = 'doctor', width = '100%', height = '100%') {
  // Gradients and common definitions
  const defs = `
    <defs>
      <!-- Fur Shading Gradient (Frosty Ice Bear White) -->
      <linearGradient id="bear-fur-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="70%" stop-color="#F8FAFC" />
        <stop offset="100%" stop-color="#E2E8F0" />
      </linearGradient>

      <!-- Blush Cheeks Gradient -->
      <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FB7185" stop-opacity="0.65" />
        <stop offset="70%" stop-color="#FDA4AF" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#FFF1F2" stop-opacity="0" />
      </radialGradient>

      <!-- Soft Ear Inner Gradient -->
      <linearGradient id="ear-inner-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FCE7F3" />
        <stop offset="100%" stop-color="#FECDD3" />
      </linearGradient>

      <!-- Pink Ribbon Bow Gradient -->
      <linearGradient id="pink-bow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDA4AF" />
        <stop offset="50%" stop-color="#FB7185" />
        <stop offset="100%" stop-color="#F43F5E" />
      </linearGradient>

      <!-- Stethoscope Gradient -->
      <linearGradient id="stetho-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>

      <!-- Golden Sparkle Glow -->
      <linearGradient id="gold-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
    </defs>
  `;

  // Base Bear Body (Round, cuddly, frosty pure white bear)
  const baseBear = `
    <!-- Outer Bear Shadow -->
    <ellipse cx="100" cy="180" rx="60" ry="12" fill="#E2E8F0" opacity="0.45" />

    <!-- Cute Round Ears -->
    <!-- Left Ear -->
    <circle cx="56" cy="62" r="22" fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2.5" />
    <circle cx="56" cy="62" r="13" fill="url(#ear-inner-grad)" />

    <!-- Right Ear -->
    <circle cx="144" cy="62" r="22" fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2.5" />
    <circle cx="144" cy="62" r="13" fill="url(#ear-inner-grad)" />

    <!-- Bear Body / Tummy -->
    <path d="M 60,110 C 45,130 40,165 52,178 C 65,188 135,188 148,178 C 160,165 155,130 140,110 Z" 
          fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2" />
    
    <!-- Soft Tummy Patch -->
    <ellipse cx="100" cy="150" rx="36" ry="24" fill="#FFFFFF" opacity="0.9" />

    <!-- Feet / Paws -->
    <ellipse cx="70" cy="178" rx="14" ry="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    <ellipse cx="70" cy="177" rx="6" ry="4" fill="#FCE7F3" />
    <ellipse cx="130" cy="178" rx="14" ry="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    <ellipse cx="130" cy="177" rx="6" ry="4" fill="#FCE7F3" />

    <!-- Bear Big Round Head -->
    <ellipse cx="100" cy="95" rx="55" ry="48" fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2.5" />

    <!-- Rosy Cheek Blush -->
    <ellipse cx="62" cy="108" rx="12" ry="7" fill="url(#blush-grad)" />
    <ellipse cx="138" cy="108" rx="12" ry="7" fill="url(#blush-grad)" />

    <!-- Sparkle on cheeks -->
    <circle cx="65" cy="106" r="1.5" fill="#FFFFFF" />
    <circle cx="135" cy="106" r="1.5" fill="#FFFFFF" />

    <!-- Big Kawaii Eyes with Double Sparkles -->
    <!-- Left Eye -->
    <ellipse cx="76" cy="92" rx="6.5" ry="8" fill="#1E293B" />
    <circle cx="74" cy="89" r="2.8" fill="#FFFFFF" />
    <circle cx="78" cy="94" r="1.2" fill="#FFFFFF" />

    <!-- Right Eye -->
    <ellipse cx="124" cy="92" rx="6.5" ry="8" fill="#1E293B" />
    <circle cx="122" cy="89" r="2.8" fill="#FFFFFF" />
    <circle cx="126" cy="94" r="1.2" fill="#FFFFFF" />

    <!-- Snout Muzzle Area -->
    <ellipse cx="100" cy="104" rx="16" ry="11" fill="#FFFFFF" />
    <!-- Cute Heart-shaped / Oval Nose -->
    <path d="M 97,100 C 97,98 100,97 100,97 C 100,97 103,98 103,100 C 103,102 100,104 100,104 C 100,104 97,102 97,100 Z" fill="#334155" />
    <circle cx="99.5" cy="99.5" r="0.8" fill="#FFFFFF" />

    <!-- W-Shaped Happy Smile -->
    <path d="M 94,106 Q 97,109 100,106 Q 103,109 106,106" stroke="#475569" stroke-width="1.6" fill="transparent" stroke-linecap="round" />
  `;

  // Specific Variants & Accessories
  let accessories = '';

  if (variant === 'doctor') {
    // Nurse/Doctor Snowy: Pink ribbon bow + Stethoscope with heart resonator
    accessories = `
      <!-- Pink Ribbon Hair Bow -->
      <g transform="translate(130, 48) rotate(15) scale(0.85)">
        <ellipse cx="-12" cy="0" rx="10" ry="7" fill="url(#pink-bow-grad)" />
        <ellipse cx="12" cy="0" rx="10" ry="7" fill="url(#pink-bow-grad)" />
        <circle cx="0" cy="0" r="5" fill="#F43F5E" />
        <path d="M -2,4 Q -8,16 -12,20" stroke="#FB7185" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 2,4 Q 8,16 12,20" stroke="#FB7185" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>

      <!-- Soft Pink / Blue Stethoscope -->
      <path d="M 80,125 Q 75,148 95,160 Q 105,160 120,145" stroke="url(#stetho-grad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <!-- Heart Resonator -->
      <g transform="translate(100, 162) scale(0.85)">
        <path d="M 0,-4 C -5,-9 -10,-4 -10,1 C -10,7 0,13 0,13 C 0,13 10,7 10,1 C 10,-4 5,-9 0,-4 Z" fill="#FB7185" stroke="#FFFFFF" stroke-width="1.5" />
      </g>

      <!-- Cute Bear Paws holding a medical flower -->
      <circle cx="70" cy="140" r="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <circle cx="130" cy="140" r="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <g transform="translate(132, 136) scale(0.6)">
        <circle cx="0" cy="0" r="5" fill="#FDE047" />
        <circle cx="0" cy="-8" r="4" fill="#F472B6" />
        <circle cx="8" cy="0" r="4" fill="#F472B6" />
        <circle cx="0" cy="8" r="4" fill="#F472B6" />
        <circle cx="-8" cy="0" r="4" fill="#F472B6" />
      </g>
    `;
  } else if (variant === 'alarm') {
    // Medicine Alarm Snowy: Holding a giant sparkling capsule pill!
    accessories = `
      <!-- Bow -->
      <g transform="translate(68, 50) rotate(-15) scale(0.8)">
        <ellipse cx="-10" cy="0" rx="9" ry="6" fill="url(#pink-bow-grad)" />
        <ellipse cx="10" cy="0" rx="9" ry="6" fill="url(#pink-bow-grad)" />
        <circle cx="0" cy="0" r="4" fill="#F43F5E" />
      </g>

      <!-- Holding Giant Cute Pill Capsule -->
      <g transform="translate(100, 142) rotate(-15)">
        <!-- Pill Shadow -->
        <rect x="-32" y="-12" width="64" height="24" rx="12" fill="#000000" opacity="0.1" transform="translate(2, 4)" />
        <!-- Pink Half -->
        <path d="M -30,-10 L 0,-10 L 0,10 L -30,10 A 10,10 0 0 1 -30,-10 Z" fill="#FB7185" />
        <!-- White/Sky Half -->
        <path d="M 0,-10 L 30,-10 A 10,10 0 0 1 30,10 L 0,10 Z" fill="#BAE6FD" />
        <!-- Pill Sheen -->
        <rect x="-26" y="-7" width="48" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" />
        <!-- Little Sparkle on Pill -->
        <path d="M 15,-2 L 17,2 L 21,4 L 17,6 L 15,10 L 13,6 L 9,4 L 13,2 Z" fill="#FFFFFF" />
      </g>

      <!-- Bear Paws Hugging the Pill -->
      <ellipse cx="72" cy="142" rx="9" ry="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <ellipse cx="128" cy="138" rx="9" ry="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />

      <!-- Floating Sparkles around Snowy -->
      <path d="M 40,75 L 42,80 L 47,82 L 42,84 L 40,89 L 38,84 L 33,82 L 38,80 Z" fill="url(#gold-star-grad)" />
      <path d="M 160,80 L 162,84 L 166,86 L 162,88 L 160,92 L 158,88 L 154,86 L 158,84 Z" fill="url(#gold-star-grad)" />
    `;
  } else if (variant === 'cozy') {
    // Cozy Period Relief Snowy: Wearing warm knit scarf and hugging a pink hot water bottle
    accessories = `
      <!-- Fluffy Earmuffs -->
      <circle cx="44" cy="90" r="16" fill="#FCE7F3" stroke="#F472B6" stroke-width="2" />
      <circle cx="156" cy="90" r="16" fill="#FCE7F3" stroke="#F472B6" stroke-width="2" />
      <path d="M 46,80 A 58,58 0 0 1 154,80" stroke="#F472B6" stroke-width="3.5" fill="none" />

      <!-- Cute Warm Scarf -->
      <path d="M 65,115 Q 100,126 135,115 Q 140,128 135,138 Q 100,146 65,138 Z" fill="#FDA4AF" stroke="#FB7185" stroke-width="1.5" />
      <!-- Hanging Scarf Tail -->
      <rect x="74" y="125" width="20" height="34" rx="4" fill="#FB7185" />
      <!-- Scarf fringe -->
      <line x1="76" y1="159" x2="76" y2="164" stroke="#F43F5E" stroke-width="2" />
      <line x1="84" y1="159" x2="84" y2="164" stroke="#F43F5E" stroke-width="2" />
      <line x1="92" y1="159" x2="92" y2="164" stroke="#F43F5E" stroke-width="2" />

      <!-- Pink Hot Water Bottle in paws -->
      <g transform="translate(108, 145) scale(0.85)">
        <rect x="-14" y="-18" width="28" height="32" rx="8" fill="#F43F5E" />
        <rect x="-6" y="-24" width="12" height="7" rx="2" fill="#BE123C" />
        <ellipse cx="0" cy="-2" rx="6" ry="6" fill="#FB7185" />
      </g>
      <circle cx="95" cy="150" r="8" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="125" cy="150" r="8" fill="#FFFFFF" stroke="#E2E8F0" />
    `;
  } else if (variant === 'emergency') {
    // Emergency Paramedic / SOS Snowy: First-aid bag with red cross & alert bow
    accessories = `
      <!-- Red Alert Bow -->
      <g transform="translate(68, 50) rotate(-15) scale(0.8)">
        <ellipse cx="-10" cy="0" rx="9" ry="6" fill="#EF4444" />
        <ellipse cx="10" cy="0" rx="9" ry="6" fill="#EF4444" />
        <circle cx="0" cy="0" r="4" fill="#DC2626" />
      </g>
      <!-- Paramedic First Aid Kit in Paws -->
      <g transform="translate(100, 145)">
        <rect x="-22" y="-14" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#EF4444" stroke-width="2" />
        <rect x="-8" y="-18" width="16" height="5" rx="2" fill="#EF4444" />
        <!-- Red Cross -->
        <rect x="-3" y="-8" width="6" height="16" rx="1.5" fill="#EF4444" />
        <rect x="-8" y="-3" width="16" height="6" rx="1.5" fill="#EF4444" />
      </g>
      <circle cx="72" cy="145" r="9" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="128" cy="145" r="9" fill="#FFFFFF" stroke="#E2E8F0" />
    `;
  } else if (variant === 'ai') {
    // AI Explainer Snowy: Wearing cute rose-gold spectacles and holding clinical report
    accessories = `
      <!-- Rose-Gold Spectacles -->
      <ellipse cx="78" cy="92" rx="14" ry="12" fill="none" stroke="#FB7185" stroke-width="2.2" />
      <ellipse cx="122" cy="92" rx="14" ry="12" fill="none" stroke="#FB7185" stroke-width="2.2" />
      <path d="M 92,92 Q 100,88 108,92" stroke="#FB7185" stroke-width="2" fill="none" />
      <!-- Holding Clinical Report Clip -->
      <g transform="translate(100, 145) rotate(5)">
        <rect x="-18" y="-16" width="36" height="32" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
        <rect x="-8" y="-19" width="16" height="5" rx="2" fill="#FB7185" />
        <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#FDA4AF" stroke-width="2" stroke-linecap="round" />
        <line x1="-12" y1="0" x2="10" y2="0" stroke="#CBD5E1" stroke-width="1.8" stroke-linecap="round" />
        <line x1="-12" y1="6" x2="6" y2="6" stroke="#CBD5E1" stroke-width="1.8" stroke-linecap="round" />
      </g>
      <circle cx="75" cy="142" r="8" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="125" cy="145" r="8" fill="#FFFFFF" stroke="#E2E8F0" />
    `;
  } else if (variant === 'avatar') {
    // Compact Header Headshot Avatar
    return `
      <svg viewBox="40 40 120 110" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Left Ear -->
        <circle cx="58" cy="62" r="18" fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2" />
        <circle cx="58" cy="62" r="10" fill="url(#ear-inner-grad)" />
        <!-- Right Ear -->
        <circle cx="142" cy="62" r="18" fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2" />
        <circle cx="142" cy="62" r="10" fill="url(#ear-inner-grad)" />
        <!-- Big Head -->
        <ellipse cx="100" cy="94" rx="48" ry="42" fill="url(#bear-fur-grad)" stroke="#E2E8F0" stroke-width="2" />
        <!-- Blush -->
        <ellipse cx="68" cy="104" rx="10" ry="6" fill="url(#blush-grad)" />
        <ellipse cx="132" cy="104" rx="10" ry="6" fill="url(#blush-grad)" />
        <!-- Eyes -->
        <ellipse cx="78" cy="92" rx="5.5" ry="6.5" fill="#1E293B" />
        <circle cx="76.5" cy="90" r="2.2" fill="#FFFFFF" />
        <ellipse cx="122" cy="92" rx="5.5" ry="6.5" fill="#1E293B" />
        <circle cx="120.5" cy="90" r="2.2" fill="#FFFFFF" />
        <!-- Snout -->
        <ellipse cx="100" cy="102" rx="13" ry="9" fill="#FFFFFF" />
        <path d="M 97,99 Q 100,97 103,99 Q 100,103 97,99 Z" fill="#334155" />
        <path d="M 96,104 Q 100,107 104,104" stroke="#475569" stroke-width="1.5" fill="none" stroke-linecap="round" />
        <!-- Pink Bow -->
        <g transform="translate(126, 56) rotate(20) scale(0.65)">
          <ellipse cx="-10" cy="0" rx="9" ry="6" fill="url(#pink-bow-grad)" />
          <ellipse cx="10" cy="0" rx="9" ry="6" fill="url(#pink-bow-grad)" />
          <circle cx="0" cy="0" r="4" fill="#F43F5E" />
        </g>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 200 200" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      ${baseBear}
      ${accessories}
    </svg>
  `;
}
