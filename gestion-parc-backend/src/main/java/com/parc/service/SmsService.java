package com.parc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private static final Logger logger = LoggerFactory.getLogger(SmsService.class);

    public void sendSms(String to, String message) {
        if (to == null || to.isEmpty()) {
            logger.warn("Numéro de téléphone manquant, impossible d'envoyer le SMS");
            return;
        }

        // Simulation d'envoi de SMS
        // TODO: Intégrer une vraie API SMS (Twilio, Orange, etc.)
        logger.info("📱 SMS envoyé à {} : {}", to, message);
        System.out.println("📱 SMS envoyé à " + to + " : " + message);
    }
}