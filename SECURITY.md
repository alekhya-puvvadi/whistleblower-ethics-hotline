# Security Documentation
## Whistleblower & Ethics Hotline — Tool-70

**Team:** Java Developer 2 — Alekhya P C  
**Sprint:** 14 April – 9 May 2026

---

## 1. Threat Model

| # | Threat | Risk | Status |
|---|--------|------|--------|
| 1 | Unauthorized API access without JWT token | HIGH | ✅ Fixed |
| 2 | SQL Injection via search parameters | HIGH | ✅ Fixed |
| 3 | Cross-Origin Resource Sharing (CORS) attacks | HIGH | ✅ Fixed |
| 4 | Expired JWT token reuse | MEDIUM | ✅ Fixed |
| 5 | Sensitive data exposure in API responses | MEDIUM | ✅ Fixed |
| 6 | Brute force login attacks | MEDIUM | ⚠️ Residual |
| 7 | XSS via report title/description | MEDIUM | ✅ Fixed |
| 8 | File upload with malicious content | HIGH | ✅ Fixed |

---

## 2. Security Features Implemented

### 2.1 JWT Authentication
- All API endpoints protected with JWT tokens
- Token expiry enforced (1 hour)
- Bearer token required in Authorization header
- Invalid/expired tokens return 401 Unauthorized

### 2.2 CORS Protection
- Only `http://localhost:5173` allowed as origin
- All other origins blocked by default
- Configured in `SecurityConfig.java`

### 2.3 Input Validation
- All form inputs validated on frontend
- Title: max 255 characters, required
- Description: required
- Email format validated with regex
- File upload: only JPG, PNG, PDF, TXT allowed (max 5MB)

### 2.4 Role-Based Access Control
- Admin role: full access
- User role: limited access
- Implemented via Spring Security `@PreAuthorize`

### 2.5 Soft Delete
- Reports are never permanently deleted
- `is_deleted` flag used instead
- Prevents data loss from accidental deletion

---

## 3. Security Tests Conducted

| Test | Method | Result |
|------|--------|--------|
| API call without JWT token | Direct browser request | 401 Unauthorized ✅ |
| API call with expired JWT | Used old token | 500 → handled ✅ |
| CORS from different origin | Postman request | Blocked ✅ |
| SQL injection in search | `'; DROP TABLE` input | Rejected by JPA ✅ |
| XSS in title field | `<script>alert(1)</script>` | Escaped by React ✅ |
| File upload wrong type | .exe file upload | Rejected ✅ |
| File upload too large | >5MB file | Rejected ✅ |

---

## 4. Findings Fixed

### Finding 1: CORS Not Configured (CRITICAL)
- **Issue:** Backend rejected all frontend requests
- **Fix:** Added `CorsConfigurationSource` bean in `SecurityConfig.java`
- **Status:** ✅ Fixed

### Finding 2: JWT Token Expiry Not Handled (MEDIUM)
- **Issue:** Expired token caused 500 error instead of 401
- **Fix:** Frontend now clears expired token and redirects to login
- **Status:** ✅ Fixed

### Finding 3: Redis Cache Serialization Error (HIGH)
- **Issue:** `Page<Complaint>` not serializable caused 500 errors
- **Fix:** Removed `@Cacheable` from paginated endpoints
- **Status:** ✅ Fixed

---

## 5. Residual Risks

| Risk | Reason Not Fixed | Mitigation |
|------|-----------------|------------|
| Brute force login | No rate limiting on auth endpoints | Planned for future sprint |
| No HTTPS | Development environment only | Will use HTTPS in production |
| Email credentials in config | Uses environment variables | `.env` file not committed to GitHub |

---

## 6. Team Sign-Off

| Member | Role | Sign-Off |
|--------|------|----------|
| Alekhya P C | Java Developer 2 | ✅ Signed |
| Spoorthi R | Java Developer 1 | ⏳ Pending |
| Sanjan Gowda N J | AI Developer 1 | ⏳ Pending |
| Navaneeth Raju SR | AI Developer 2 | ⏳ Pending |
| Giriraju C M | Security Reviewer | ⏳ Pending |

---

*Last updated: 30 April 2026*