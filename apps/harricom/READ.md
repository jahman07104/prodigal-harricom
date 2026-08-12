1HARRICOM STARTER KIT — README (v1)
A simple guide to using your Harricom assets, templates, and brand files.

1. Overview
   This Starter Kit contains everything needed to build, customize, and publish Harricom websites and templates for Jamaican MSMEs, diaspora clients, and returning residents.

It includes:

Icons (SVG)

Hero image prompts

Brand guide

HTML/CSS templates

Catalog page

Folder structure for organization

Assets for future expansion

Everything is designed to be:

Clean

Jamaican-authentic

Easy to edit

Fast to deploy

Consistent with Harricom’s brand identity

2. Folder Structure
   Code
   Harricom
   │
   ├── assets
   │ ├── icons
   │ ├── hero-images
   │ ├── gallery
   │ ├── brand
   │ └── logos
   │
   ├── templates
   │ ├── taxi
   │ ├── tradesman
   │ ├── barber
   │ ├── nail-tech
   │ ├── dressmaker
   │ ├── block-factory
   │ └── home-business
   │
   └── catalog
   What each folder is for:
   assets/icons → All SVG icons for categories

assets/hero-images → Generated hero images for templates

assets/gallery → Additional images for templates

assets/brand → Brand guide, color palette, typography

assets/logos → Harricom logo files (future)

templates/ → Each business template in its own folder

catalog/ → The catalog page with filters

3. How to Use the Templates
   Each template folder contains:

index.html

style.css (if separated)

Placeholder images

Placeholder icons

To customize:

Replace placeholder images with your hero images

Replace text with the business’s real content

Update WhatsApp links, phone numbers, and pricing

Swap icons if needed

Upload to hosting (DigitalOcean, HostGator, etc.)

4. How to Use the Icons
   Icons are in SVG format.

To use an icon:

Option 1 — As an image
html
<img src="../assets/icons/taxi.svg" alt="Taxi icon">
Option 2 — Inline SVG
Copy the SVG code directly into your HTML.

5. How to Generate Hero Images
   Use the prompts in:

assets/hero-images/prompts.txt

To generate images:

Open Copilot Designer (or any AI image generator)

Paste one of the prompts

Generate the image

Download it

Save it into:
assets/hero-images/

Replace the placeholder in your template

6. Brand Consistency
   Follow the brand guide in:

assets/brand/brand-guide.txt

This ensures:

Colors match

Typography matches

Icons match

Layout spacing matches

Buttons look consistent

7. Catalog Page
   The catalog page lives in:

catalog/index.html

This page:

Displays all templates

Uses filters (Barber, Taxi, Tradesman, etc.)

Links to template previews

You can add new templates anytime by:

Adding a new card

Adding a new filter button

Adding the template folder

8. Future Expansion
   This Starter Kit is designed to grow.

You can add:

More templates

More icons

More hero images

A full Harricom logo set

The Prodigal platform assets

Blog content

Social media graphics

9. Support Notes
   This kit is built for:

MSMEs

Diaspora

Returning residents

Digital nomads

Tradesmen

Taxi operators

Home businesses

It is optimized for:

Fast loading

Mobile-first design

WhatsApp integration

Simple editing

Jamaican authenticity

✔ README COMPLETE
