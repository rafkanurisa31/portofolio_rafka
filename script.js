// 1. Efek Mengetik Otomatis (Typewriter Effect)
const words = ["Siswa SMK Tunas Harapan Pati.", "Tech & Gaming Enthusiast.", "Junior Web Developer."];
let i = 0;
let timer;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typewriter').innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000); // Jeda sebelum teks dihapus kembali
      return false;
    }
    timer = setTimeout(loopTyping, 100); // Kecepatan mengetik
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typewriter').innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(typingEffect, 500);
      return false;
    }
    timer = setTimeout(loopDeleting, 50); // Kecepatan menghapus teks
  };
  loopDeleting();
}

// Jalankan efek mengetik saat web pertama kali dimuat
document.addEventListener("DOMContentLoaded", function() {
  typingEffect();
});

// 2. Mengisi Tahun Secara Otomatis di Footer
document.getElementById('year').textContent = new Date().getFullYear();