from slowapi import Limiter
from slowapi.util import get_remote_address

def setup_rate_limiting():
    """
    Configure rate limiting
    """
    limiter = Limiter(key_func=get_remote_address)
    return limiter
