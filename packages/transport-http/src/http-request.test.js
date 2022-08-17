import * as fetchTransport from "node-fetch"
import * as logger from "@onflow/util-logger"
import {httpRequest} from "./http-request"

describe("httpRequest", () => {
  test("makes valid fetch request", async () => {
    const spy = jest.spyOn(fetchTransport, "default")
    spy.mockImplementation(async () => ({
      ok: true,
      status: 200,
      body: JSON.stringify({
        foo: "bar",
      }),
      async json() {
        return JSON.parse(this.body)
      },
    }))

    const opts = {
      hostname: "https://example.com",
      path: "/foo/bar",
      body: "abc123",
      method: "POST",
      headers: {
        Authorization: "Bearer 1RyXjsFJfU",
      },
    }

    await httpRequest(opts)

    await expect(spy).toHaveBeenCalledWith(`${opts.hostname}${opts.path}`, {
      method: opts.method,
      body: JSON.stringify(opts.body),
      headers: opts.headers,
    })
  })

  test("handles http error properly, throws HTTP error", async () => {
    const spy = jest.spyOn(fetchTransport, "default")
    spy.mockImplementation(async () => ({
      ok: false,
      body: JSON.stringify({
        foo: "bar",
      }),
      async json() {
        return JSON.parse(this.body)
      },
      status: 400,
      statusText: "foo bar",
    }))

    const opts = {
      hostname: "https://example.com",
      path: "/foo/bar",
      body: "abc123",
      method: "POST",
      headers: {
        Authorization: "Bearer 1RyXjsFJfU",
      },
    }

    await expect(httpRequest(opts)).rejects.toThrow("HTTP Request Error:")
  })

  test("retries retriable error", async () => {
    const spy = jest.spyOn(fetchTransport, "default")

    const mockBadResponse = {
      ok: false,
      body: "",
      async json() {
        return JSON.parse(this.body)
      },
      async text() {
        return this.body
      },
      status: 429, // 429 is a retriable error
      statusText: "Too many requests",
    }

    const mockGoodResponse = {
      ok: true,
      body: JSON.stringify({
        foo: "bar",
      }),
      async json() {
        return JSON.parse(this.body)
      },
      async text() {
        return this.body
      },
      status: 200,
    }

    spy.mockImplementation(async () => {
      if (spy.mock.calls.length === 1) return mockBadResponse
      return mockGoodResponse
    })

    const opts = {
      hostname: "https://example.com",
      path: "/foo/bar",
      body: "abc123",
      method: "POST",
    }

    const response = await httpRequest(opts)

    await expect(response).toEqual(JSON.parse(mockGoodResponse.body))
  })

  test("handles fetch error properly, displays AN error", async () => {
    const fetchSpy = jest.spyOn(fetchTransport, "default")

    fetchSpy.mockImplementation(() =>
      Promise.reject({
        ok: false,
        body: JSON.stringify({
          foo: "bar",
        }),
        async json() {
          return JSON.parse(this.body)
        },
        status: 400,
        statusText: "foo bar",
      })
    )

    const loggerSpy = jest.spyOn(logger, "log")
    loggerSpy.mockImplementation(() => {})

    const opts = {
      hostname: "https://example.com",
      path: "/foo/bar",
      body: "abc123",
      method: "POST",
      headers: {
        Authorization: "Bearer 1RyXjsFJfU",
      },
    }

    await expect(httpRequest(opts)).rejects.toThrow("HTTP Request Error:")
    expect(loggerSpy.mock.calls[0][0].title).toBe("Access Node Error")
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
