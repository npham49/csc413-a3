#include <MFRC522.h>
#include <SPI.h>

// Define RST and SS pins for each reader
#define RST_PIN 9
#define SS_1_PIN 10
#define SS_2_PIN 8

#define NR_OF_READERS 2
byte ssPins[] = {SS_1_PIN, SS_2_PIN};
MFRC522 mfrc522[NR_OF_READERS];

void setup() {
  Serial.begin(9600);
  while (!Serial)
    ; // Wait for serial connection (for Leonardo/Micro)

  SPI.begin(); // Initialize SPI bus

  // Initialize each reader
  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    mfrc522[reader].PCD_Init(ssPins[reader], RST_PIN);
    Serial.print(F("Reader "));
    Serial.print(reader);
    Serial.print(F(" initialized on SS pin "));
    Serial.println(ssPins[reader]);
  }
}

void loop() {
  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    if (mfrc522[reader].PICC_IsNewCardPresent() &&
        mfrc522[reader].PICC_ReadCardSerial()) {
      Serial.print(F("Reader "));
      Serial.print(reader);
      Serial.print(F(" UID: "));
      printUID(mfrc522[reader].uid.uidByte, mfrc522[reader].uid.size);
      // uint32_t tagID = printTagID(mfrc522[reader].uid.uidByte,
      // mfrc522[reader].uid.size);
      uint32_t tagID = getTagNumber(mfrc522[reader].uid.uidByte);

      Serial.print("\nTag Number: ");
      Serial.print(tagID);
      Serial.println();
      if (tagID == 2713759238 || tagID == 2976165638) {
        Serial.println("Top: Shirt");
      } else if (tagID == 4056264198 || tagID == 1902292742) {
        Serial.println("Top: TShirt");
      } else if (tagID == 2439032582 || tagID == 3776032262) {
        Serial.println("Bottom: Pants");
      } else if (tagID == 22916870 || tagID == 566537734) {
        Serial.println("Bottom: Skirt");
      } 
      mfrc522[reader].PICC_HaltA();      // Halt the card
      mfrc522[reader].PCD_StopCrypto1(); // Stop encryption
    }
  }
}

void printUID(byte *buffer, byte length) {
  for (byte i = 0; i < length; i++) {
    if (buffer[i] < 0x10)
      Serial.print("0");
    Serial.print(buffer[i], HEX);
    if (i != length - 1)
      Serial.print(":");
  }
}
uint32_t printTagID(byte *buffer, byte length) {
  uint32_t tagID = 0;
  for (byte i = 0; i < length; i++) {
    tagID = (tagID << 8) | buffer[i];
  }
  // Serial.print(tagID);
  return tagID;
}

uint32_t getTagNumber(byte *uid) {
  return ((uint32_t)uid[0] << 24) | ((uint32_t)uid[1] << 16) |
         ((uint32_t)uid[2] << 8) | ((uint32_t)uid[3]);
}
