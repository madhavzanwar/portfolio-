import fs from 'fs';
import path from 'path';

const publicProjectsDir = path.resolve('public/images/projects');
if (!fs.existsSync(publicProjectsDir)) {
  fs.mkdirSync(publicProjectsDir, { recursive: true });
}

const assets = [
  {
    src: 'C:\\Users\\poona\\.gemini\\antigravity\\brain\\180953d0-0747-4673-afa9-c18db1281999\\quicksketch_playful_showcase_1789172272122.jpg',
    dest: 'quicksketch.jpg'
  },
  {
    src: 'C:\\Users\\poona\\.gemini\\antigravity\\brain\\180953d0-0747-4673-afa9-c18db1281999\\memoryverse_silver_showcase_1789172508967.jpg',
    dest: 'memoryverse.jpg'
  },
  {
    src: 'C:\\Users\\poona\\.gemini\\antigravity\\brain\\180953d0-0747-4673-afa9-c18db1281999\\kisansathi_real_showcase_1789171699109.jpg',
    dest: 'kisansathi.jpg'
  },
  {
    src: 'C:\\Users\\poona\\.gemini\\antigravity\\brain\\180953d0-0747-4673-afa9-c18db1281999\\traceguard_money_showcase_1789171862154.jpg',
    dest: 'traceguard.jpg'
  },
  {
    src: 'C:\\Users\\poona\\.gemini\\antigravity\\brain\\180953d0-0747-4673-afa9-c18db1281999\\synapse_teacher_showcase_1789172489447.jpg',
    dest: 'synapse.jpg'
  }
];

for (const item of assets) {
  const target = path.join(publicProjectsDir, item.dest);
  fs.copyFileSync(item.src, target);
  const size = fs.statSync(target).size;
  console.log(`Copied ${item.dest} (${(size / 1024).toFixed(1)} KB)`);
}
console.log('All 5 project advertising showcases successfully copied!');
