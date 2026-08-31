import time
from functools import wraps
from threading import RLock

from django.db import OperationalError, transaction


sqlite_write_lock = RLock()


def sqlite_write_transaction(max_attempts=5, base_delay=0.25):
    """
    Ejecuta escrituras de SQLite una por una y reintenta si la base queda ocupada.
    """

    def decorator(view_method):
        @wraps(view_method)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    with sqlite_write_lock:
                        with transaction.atomic():
                            return view_method(*args, **kwargs)
                except OperationalError as error:
                    is_locked_error = (
                        "database is locked"
                        in str(error).lower()
                    )

                    if (
                        not is_locked_error
                        or attempt == max_attempts - 1
                    ):
                        raise

                    time.sleep(
                        base_delay * (attempt + 1)
                    )

        return wrapper

    return decorator
