function calculatePoints(wasteType, weightKg) {
  const multipliers = {
    Plastic: 10,
    Glass: 8,
    Paper: 6,
    Metal: 12
  };
  const m = multipliers[wasteType] || 5;
  return Math.round(weightKg * m);
}

module.exports = { calculatePoints };
