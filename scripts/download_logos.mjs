import fs from 'fs';

async function download() {
  fs.mkdirSync('public/images/logos', { recursive: true });

  // 1. LeetCode SVG
  const svgRes = await fetch('https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg');
  const svgText = await svgRes.text();
  fs.writeFileSync('public/images/logos/leetcode.svg', svgText);
  console.log('Saved leetcode.svg:', svgText.length);

  // 2. LeetCode PNG brand mark
  const pngRes = await fetch('https://assets.leetcode.com/static_assets/public/images/LeetCode_logo_rvs.png');
  const pngBuf = Buffer.from(await pngRes.arrayBuffer());
  fs.writeFileSync('public/images/logos/leetcode-brand.png', pngBuf);
  console.log('Saved leetcode-brand.png:', pngBuf.length);

  // 3. Flask Red Chili SVG
  const flaskRes = await fetch('https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg');
  let flaskSvg = await flaskRes.text();
  flaskSvg = flaskSvg.replace('fill="#010101"', 'fill="#EF4444"');
  fs.writeFileSync('public/images/logos/flask.svg', flaskSvg);
  console.log('Saved flask.svg (red chili):', flaskSvg.length);
}

download();
