package com.exchange.trading.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trade-ws")
public class TradeWebSocketController {

    @PostMapping("/test")
    public ResponseEntity<?> testEndpoint(@RequestBody String message) {
        try {
            // simulate processing
            String response = "Received: " + message;
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }
}