function detect(){
  if(video.style.display!== 'none') ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // CENTER REGION ONLY - ignores background
  let cw = canvas.width, ch = canvas.height;
  let boxSize = 150; // center box size (adjust if needed)
  let sx = (cw - boxSize) / 2;
  let sy = (ch - boxSize) / 2;

  let data = ctx.getImageData(sx, sy, boxSize, boxSize).data;
  let r=0,g=0,b=0;
  let pixelCount = data.length / 4;
  for(let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; }
  r = r/pixelCount; g = g/pixelCount; b = b/pixelCount;
  let total = r+g+b;

  // Draw center box outline on canvas for visual guide
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 3;
  ctx.strokeRect(sx, sy, boxSize, boxSize);

  let result = "UNKNOWN"; let color = "#fbbf24";

  // BEST LOGIC - Blue ki highest priority for Plastic
  if(b > r+25 && b > g+25){
    result="♻️ PLASTIC DETECTED"; counts.plastic++; color="#3b82f6";
  }
  else if(g > r+25 && g > b+25){
    result="🌿 WET WASTE DETECTED"; counts.wet++; color="#22c55e";
  }
  else if(r > g+25 && r > b+25 && total < 450){
    result="🔩 METAL DETECTED"; counts.metal++; color="#ef4444";
  }
  else if(total > 550){
    result="📄 PAPER DETECTED"; counts.paper++; color="#f59e0b";
  }

  resultDiv.innerText = result;
  resultDiv.style.background = color;

  document.getElementById('plastic-count').innerText = counts.plastic;
  document.getElementById('wet-count').innerText = counts.wet;
  document.getElementById('metal-count').innerText = counts.metal;
  document.getElementById('paper-count').innerText = counts.paper;
  let co2 = (counts.plastic*0.5 + counts.wet*0.2 + counts.metal*0.8 + counts.paper*0.3).toFixed(2);
  document.getElementById('co2').innerText = co2;
}