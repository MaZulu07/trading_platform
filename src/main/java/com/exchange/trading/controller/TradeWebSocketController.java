package com.exchange.trading.controller;

import com.exchange.trading.model.Trade;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TradeWebSocketController {

    @MessageMapping("/trade")
    @SendTo("/topic/trades")
    public Trade broadcastTrade(Trade trade) {
        return trade;
    }
}