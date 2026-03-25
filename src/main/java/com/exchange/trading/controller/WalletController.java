package com.exchange.trading.controller;

import com.exchange.trading.model.Wallet;
import com.exchange.trading.service.WalletService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @PostMapping("/{userId}")
    public Wallet createWallet(@PathVariable String userId) {
        return walletService.createWallet(userId);
    }

    @GetMapping("/{userId}")
    public Wallet getWallet(@PathVariable String userId) {
        return walletService.getWallet(userId);
    }
}