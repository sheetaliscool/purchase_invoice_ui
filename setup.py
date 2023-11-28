from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in purchase_invoice_ui/__init__.py
from purchase_invoice_ui import __version__ as version

setup(
	name="purchase_invoice_ui",
	version=version,
	description="An application to createpurchase invoice using Frappe API",
	author="SA",
	author_email="sheetal.jiji.ambre@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
