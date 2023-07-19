/* eslint-disable @next/next/no-img-element */
'use client'

import QRCanvas from '@/components/QRCanvas'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { QRCanvasOptions } from 'qrcanvas'
import { Checkbox } from '@/components/ui/checkbox'
import NextImage from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const DEFAULT_OPTIONS: QRCanvasOptions = {
    background: 'white',
    foreground: 'black',
    typeNumber: 0,
    correctLevel: 'L',
    data: '',
    padding: 2,
    resize: true,
}

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

const formSchema = z.object({
    text: z.string(),
    size: z.number().min(8).max(40).default(8),
    padding: z.number().min(0).max(40).default(2),
    effectType: z.enum([`round`, `fusion`, `spot`, 'none']).default('none'),
    effectValue: z.number().min(0).max(100),
})

function QrMaker() {
    const [useLogo, setUseLogo] = useState<boolean>(false)
    const [useLogoWithText, setUseLogoWithText] = useState<boolean>(false)
    const [previewImageSrc, setPreviewImageSrc] = useState<string>('')
    const [previewImage, setPreviewImage] = useState<CanvasImageSource>()
    const [selectedFile, setSelectedFile] = useState<File>()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const logoImgRef = useRef<HTMLImageElement>(new Image())
    const [options, setOptions] = useState<QRCanvasOptions>(DEFAULT_OPTIONS)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: '',
            size: 8,
            effectType: 'none',
            effectValue: 100,
            padding: 2,
        },
    })

    useEffect(() => {
        setOptions({
            canvas: canvasRef.current || undefined,
        })
    }, [])

    useEffect(() => {
        if (!selectedFile) {
            setPreviewImage(undefined)
            setPreviewImageSrc('')
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreviewImageSrc(objectUrl)
        setPreviewImage(() => {
            const image = new Image()
            image.src = objectUrl
            return image
        })
        //  logoImgRef.current.

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const resetLogo = () => {
        setPreviewImage(undefined)
        setPreviewImageSrc('')
    }

    return (
        <div className="flex flex-col md:flex-row space-x-4 container">
            <div className="flex-1">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        max={40}
                                        min={8}
                                        step={1}
                                        className="pb-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="padding"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        max={40}
                                        min={0}
                                        step={1}
                                        className="pb-4"
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="effectType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1 pb-4"
                                    >
                                        <EffectFormRadioGroupItem value="none" />
                                        <EffectFormRadioGroupItem value="round" />
                                        <EffectFormRadioGroupItem value="fusion" />
                                        <EffectFormRadioGroupItem value="spot" />
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="effectValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field.name}
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        // @ts-ignore
                                        onValueChange={field.onChange}
                                        max={100}
                                        step={1}
                                        className="pb-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div
                        className="flex items-center space-x-2"
                        onClick={() => setUseLogo(!useLogo)}
                    >
                        <Switch id="airplane-mode" checked={useLogo} />
                        <Label htmlFor="airplane-mode">Use Logo</Label>
                    </div>
                    {/* <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                                checked={addLogo}
                                onCheckedChange={() => {
                                    setAddLogo(!addLogo)
                                }}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Add Logo</FormLabel>
                        </div>
                    </FormItem> */}

                    {useLogo && (
                        <Tabs defaultValue="image" className="mt-4 w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger
                                    value="image"
                                    onClick={() => resetLogo()}
                                >
                                    Image
                                </TabsTrigger>
                                <TabsTrigger
                                    value="text"
                                    onClick={() => resetLogo()}
                                >
                                    Text
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="image">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Image</CardTitle>
                                        <CardDescription>
                                            Use an Image as logo
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedFile && (
                                            <img
                                                className="w-fit p-4"
                                                alt="logo"
                                                src={previewImageSrc}
                                            />
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => {
                                                e.preventDefault()
                                                if (
                                                    e.target.files &&
                                                    e.target.files.length !== 0
                                                ) {
                                                    setSelectedFile(
                                                        e.target.files[0]
                                                    )
                                                }
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="text">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Text</CardTitle>
                                        <CardDescription>
                                            Use text as logo
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Input type="text" />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    )}
                </Form>
            </div>
            <div className="flex-1">
                <QRCanvas
                    options={{
                        ...options,
                        cellSize: form.watch('size') || 16,
                        data: form.watch('text'),
                        size: form.watch('size') + form.watch('padding') * 2,
                        padding: 16,
                        effect: {
                            type: form.watch('effectType') || 'none',
                            value: form.watch('effectValue') / 100,
                        },
                        logo: {
                            image: previewImage,
                        },
                    }}
                    className="border"
                />
            </div>
        </div>
    )
}

export default QrMaker

function EffectFormRadioGroupItem({ value }: { value: string }) {
    return (
        <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
                <RadioGroupItem value={value} />
            </FormControl>
            <FormLabel className="font-normal capitalize">{value}</FormLabel>
        </FormItem>
    )
}
