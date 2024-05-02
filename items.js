let items = [];

module.exports = {
    getItems: () => items,
    addItem: (item) => {
        items.push(item);
    },
    clearItems: () => {
        items = [];
    }
};
