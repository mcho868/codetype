def f(i):
    if type(i) != int:
        raise ValueError("this is not an integer")

    return f"this is an integer: {int(i)}"


print(f(1))
print(f("dsa"))
