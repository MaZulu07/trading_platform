package com.exchange.trading.controller;

import com.exchange.trading.model.Trade;
import com.exchange.trading.service.TradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trade")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @PostMapping("/execute")
    public Trade executeTrade(@RequestBody Trade trade) {
        return tradeService.executeTrade(trade);
    }

    @GetMapping("/{userId}")
    public List<Trade> getTrades(@PathVariable String userId) {
        return tradeService.getTrades(userId);
    }
}