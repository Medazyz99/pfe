package com.parc.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PushNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(PushNotificationService.class);

    public void sendPush(String token, String title, String body) {
        if (token == null || token.isEmpty()) {
            logger.warn("Token FCM manquant, impossible d'envoyer la notification push");
            return;
        }

        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .setToken(token)
                .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            logger.info("✅ Push envoyé avec succès - Response: {}", response);
        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'envoi du push : {}", e.getMessage(), e);
        }
    }
}