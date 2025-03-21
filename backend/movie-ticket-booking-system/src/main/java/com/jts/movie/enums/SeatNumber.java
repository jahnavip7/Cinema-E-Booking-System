package com.jts.movie.enums;

public enum SeatNumber {
    A1, A2, A3, A4, A5,
    B1, B2, B3, B4, B5,
    C1, C2, C3, C4, C5,
    D1, D2, D3, D4, D5,
    E1, E2, E3, E4, E5,
    F1, F2, F3, F4, F5,
    G1, G2, G3, G4, G5,
    H1, H2, H3, H4, H5;

    // Utility to validate if a string is a valid seat
    public static boolean isValidSeat(String seat) {
        try {
            SeatNumber.valueOf(seat);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}

