from pydantic import BaseModel


class FAQItem(BaseModel):
    question: str
    answer: str


class ServicePublic(BaseModel):
    slug: str
    title: str
    summary: str
    problems: list[str]
    benefits: list[str]
    process: list[str]
    faqs: list[FAQItem]


class ServiceCreate(BaseModel):
    slug: str
    title: str
    summary: str
    problems: list[str]
    benefits: list[str]
    process: list[str]
    faqs: list[FAQItem]


class ServiceUpdate(BaseModel):
    title: str | None = None
    summary: str | None = None
    problems: list[str] | None = None
    benefits: list[str] | None = None
    process: list[str] | None = None
    faqs: list[FAQItem] | None = None
