package com.exchange.trading.service;

import com.exchange.trading.model.Trade;
import com.exchange.trading.repository.TradeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public Trade executeTrade(Trade trade) {
        if (trade.getTimestamp() == null)
            trade.setTimestamp(java.time.LocalDateTime.now());
        return tradeRepository.save(trade);
    }

    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    public List<Trade> getTrades(String userId) {
        return tradeRepository.findByUserId(userId);
    }
}