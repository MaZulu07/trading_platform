package com.exchange.trading.controller;

import com.exchange.trading.model.Wallet;
import com.exchange.trading.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    private final WalletService walletService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WalletController(WalletService walletService, SimpMessagingTemplate messagingTemplate) {
        this.walletService = walletService;
        this.messagingTemplate = messagingTemplate;
    }

    // Create a new wallet and broadcast
    @PostMapping("/{userId}")
    public Wallet createWallet(@PathVariable String userId) {
        Wallet wallet = walletService.createWallet(userId);
        messagingTemplate.convertAndSend("/topic/wallets", wallet); // broadcast
        return wallet;
    }

    // Get a specific wallet
    @GetMapping("/{userId}")
    public Wallet getWallet(@PathVariable String userId) {
        return walletService.getWallet(userId);
    }

    // Get all wallets
    @GetMapping("/all")
    public List<Wallet> getAllWallets() {
        return walletService.getAllWallets();
    }

    // Update a wallet and broadcast
    @PostMapping("/update")
    public Wallet updateWallet(@RequestBody Wallet wallet) {
        Wallet updated = walletService.updateWallet(wallet);
        messagingTemplate.convertAndSend("/topic/wallets", updated); // broadcast
        return updated;
    }
}