class MarketplaceEvent {
    ORDER_ADDED = 'OrderAdded'
    ORDER_MATCHED = 'OrderMatched'
    ORDER_CANCELED = 'OrderCanceled'
}

const marketPlaceEvent = new MarketplaceEvent()

module.exports = marketPlaceEvent;