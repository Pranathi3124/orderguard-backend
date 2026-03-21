const validTransitions = {
  PLACED: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: []
};

function canTransition(current, next) {
  return validTransitions[current]?.includes(next);
}

module.exports = { canTransition };