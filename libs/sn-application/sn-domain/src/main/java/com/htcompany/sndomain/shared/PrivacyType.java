package com.htcompany.sndomain.shared;

public enum PrivacyType {
    PUBLIC {
        public boolean isPublicMode() {
            return true;
        }
    },
    FRIEND {
        public boolean isFriendMode() {
            return true;
        }
    },
    PRIVATE {
        public boolean isPrivateMode() {
            return true;
        }
    };

    public boolean isPublicMode() {
        return false;
    }

    public boolean isFriendMode() {
        return false;
    }

    public boolean isPrivateMode() {
        return false;
    }
}
