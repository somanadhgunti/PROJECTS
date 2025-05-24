package com.example.aiapp;
import com.example.aiapp.TextRequest;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    @PostMapping("/call-text-prediction")
    public ResponseEntity<String> callTextPrediction(@RequestBody TextRequest request) {
        String inputText = request.getText();
        String prediction = "Sentiment: Positive";
        return ResponseEntity.ok("Text: " + inputText + " → " + prediction);
    }
}