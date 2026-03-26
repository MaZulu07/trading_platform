package com.exchange.trading.controller;

import com.exchange.trading.model.Trade;
import com.exchange.trading.service.TradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trade")
public class TradeController {

    private final TradeService tradeService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public TradeController(TradeService tradeService, SimpMessagingTemplate messagingTemplate) {
        this.tradeService = tradeService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/execute")
    public Trade executeTrade(@RequestBody Trade trade) {
        Trade saved = tradeService.executeTrade(trade);
        messagingTemplate.convertAndSend("/topic/trades", saved);
        return saved;
    }

    @GetMapping("/all")
    public List<Trade> getAllTrades() {
        return tradeService.getAllTrades();
    }

    @GetMapping("/{userId}")
    public List<Trade> getTradesByUser(@PathVariable String userId) {
        return tradeService.getTrades(userId);
    }
}